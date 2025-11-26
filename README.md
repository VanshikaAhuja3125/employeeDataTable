# React Data Table

A fully functional, feature-rich data table component built with React, featuring sorting, filtering, pagination, and date range selection.

## Features

### Core Functionality
- ✅ **Data Display**: View data in a clean, organized table format
- ✅ **Multi-Column Sorting**: Sort by multiple columns with ascending/descending order
- ✅ **Text Filtering**: Search and filter data by name and email
- ✅ **Date Range Filtering**: Filter date columns using a calendar date picker
- ✅ **Pagination**: Traditional pagination with 10 items per page
- ✅ **Infinite Scroll**: Toggle between pagination and infinite scroll modes
- ✅ **Column Visibility**: Show/hide columns dynamically
- ✅ **Inline Editing**: Edit status column with dropdown selection
- ✅ **Row Details Modal**: View complete row information in a modal
- ✅ **Responsive Design**: Sticky first column with horizontal scrolling

### Technical Features
- Built with React 19 and Vite
- State management using React Context API
- Custom table, pagination, and sorting implementations (no external table libraries)
- Date filtering using react-datepicker
- Clean, modern UI with custom CSS

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ColumnManager/  # Column visibility manager
│   ├── DateFilter/     # Date range picker component
│   ├── Modal/          # Row details modal
│   ├── Pagination/     # Pagination and scroll toggle
│   ├── SearchBar/      # Search input component
│   └── Table/          # Table components (Header, Row, Cell)
├── constants/          # Table configuration
├── context/            # React Context for state management
├── data/               # Sample JSON data
├── utils/              # Utility functions
└── views/              # Main view components
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/VanshikaAhuja3125/employeeDataTable.git
cd employeeDataTable
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Usage

### Table Configuration
Edit `src/constants/tableConfig.js` to configure:
- Column definitions (label, accessor, sortable, visible, editable)
- Items per page
- Editable column options

### Sample Data
The table uses sample data from `src/data/sampleData.json`. Replace this with your own data source.

### Features Guide

**Sorting:**
- Click any sortable column header to sort (ascending)
- Click again to reverse (descending)
- Click a third time to remove sorting
- Click multiple columns for multi-column sorting

**Filtering:**
- Use the search bar to filter by name or email
- Click the calendar icon on date columns to filter by date range

**Pagination:**
- Use the pagination controls at the bottom
- Toggle between "Pagination" and "Scroll" modes

**Column Management:**
- Click the column manager button to show/hide columns
- NAME and ACTIONS columns are mandatory and cannot be hidden

**Editing:**
- Click the edit icon on editable columns (Status)
- Select a new value from the dropdown
- Changes are saved immediately

**View Details:**
- Click "View Details" in the ACTIONS column to see full row information

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Context API** - State management
- **react-datepicker** - Date range selection
- **date-fns** - Date manipulation
- **lucide-react** - Icons
- **Tailwind CSS** - Styling (via PostCSS)

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge)

## License

MIT

## Repository

GitHub: https://github.com/VanshikaAhuja3125/employeeDataTable
