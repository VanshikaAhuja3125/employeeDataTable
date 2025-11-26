import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import DatePicker from "react-datepicker"
import { createPortal } from "react-dom"
import "react-datepicker/dist/react-datepicker.css"
import { Calendar as CalendarIcon } from "lucide-react"
import "./DateFilter.css"

const DateFilter = ({ column, onDateChange, dateRange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const popoverRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Update popover position
      updatePopoverPosition()
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const updatePopoverPosition = () => {
    if (containerRef.current && popoverRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      popoverRef.current.style.top = `${rect.bottom + window.scrollY + 8}px`
      popoverRef.current.style.left = `${rect.left + window.scrollX}px`
    }
  }

  const handleDateChange = (dates) => {
    if (dates && Array.isArray(dates)) {
      const [start, end] = dates
      if (start) {
        onDateChange(column.accessor, { from: start, to: end || null })
      } else {
        onDateChange(column.accessor, null)
      }
    } else if (dates) {
      // Single date selected (start of range)
      onDateChange(column.accessor, { from: dates, to: null })
    } else {
      onDateChange(column.accessor, null)
    }
  }

  return (
    <>
      <div className="date-filter-container" ref={containerRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="date-filter-trigger"
          style={{
            height: '32px',
            width: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            backgroundColor: '#ffffff',
            color: dateRange?.from ? '#1f2937' : '#9ca3af',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.backgroundColor = '#f9fafb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.backgroundColor = '#ffffff';
          }}
        >
          <CalendarIcon style={{ marginRight: '8px', width: '16px', height: '16px' }} />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} -{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </button>
      </div>
      {isOpen && createPortal(
        <div 
          className="date-picker-popover" 
          ref={popoverRef}
          style={{
            position: 'fixed',
            zIndex: 9999,
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            padding: '16px',
            overflow: 'hidden'
          }}
        >
          <DatePicker
            selected={dateRange?.from || null}
            onChange={handleDateChange}
            startDate={dateRange?.from || null}
            endDate={dateRange?.to || null}
            selectsRange
            inline
            monthsShown={1}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="MMM dd, yyyy"
            calendarClassName="custom-datepicker"
            isClearable={false}
          />
          {dateRange && (dateRange.from || dateRange.to) && (
            <div style={{ padding: '12px', borderTop: '1px solid #e5e7eb', backgroundColor: '#ffffff', marginTop: '8px' }}>
              <button
                onClick={() => {
                  onDateChange(column.accessor, null)
                  setIsOpen(false)
                }}
                style={{
                  width: '100%',
                  padding: '6px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  color: '#6b7280',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  )
}

export default DateFilter
