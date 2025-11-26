import { TableProvider } from '../../context/TableContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import Table from '../../components/Table/Table';
import DataProfileModal from '../../components/Modal/DataProfileModal';
import PaginationToggle from '../../components/Pagination/PaginationToggle';
import './DataTableView.css';

const DataTableView = () => {
  return (
    <TableProvider>
      <div className="data-table-view">
        <div className="data-table-header">
          <h1>Employee Data Table</h1>
          <SearchBar />
          <PaginationToggle />
        </div>
        <Table />
        <DataProfileModal />
      </div>
    </TableProvider>
  );
};

export default DataTableView;

