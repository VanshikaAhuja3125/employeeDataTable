export const tableColumns = [
  {
    id: 'name',
    label: 'NAME',
    accessor: 'name',
    sortable: true,
    visible: true,
    editable: false
  },
  {
    id: 'managerEmail',
    label: 'MANAGER EMAIL',
    accessor: 'managerEmail',
    sortable: true,
    visible: true,
    editable: false
  },
  {
    id: 'enps',
    label: 'ENPS',
    accessor: 'enps',
    sortable: true,
    visible: true,
    editable: false
  },
  {
    id: 'mrxScore',
    label: 'MRX SCORE',
    accessor: 'mrxScore',
    sortable: true,
    visible: true,
    editable: false
  },
  {
    id: 'dateOfJoining',
    label: 'DATE OF JOINING',
    accessor: 'dateOfJoining',
    sortable: true,
    visible: true,
    editable: false,
    isDate: true
  },
  {
    id: 'tenureInCurrentRole',
    label: 'TENURE IN CURRENT ROLE',
    accessor: 'tenureInCurrentRole',
    sortable: true,
    visible: true,
    editable: false
  },
  {
    id: 'totalAttrition',
    label: 'TOTAL ATTRITION',
    accessor: 'totalAttrition',
    sortable: true,
    visible: true,
    editable: false
  },
  {
    id: 'tenure',
    label: 'TENURE',
    accessor: 'tenure',
    sortable: true,
    visible: true,
    editable: false
  },
  {
    id: 'status',
    label: 'STATUS',
    accessor: 'status',
    sortable: true,
    visible: true,
    editable: true, // This column will be editable with dropdown
    editOptions: ['Active', 'Inactive', 'On Leave', 'Terminated']
  },
  {
    id: 'actions',
    label: 'ACTIONS',
    accessor: 'actions',
    sortable: false,
    visible: true,
    editable: false,
    isActionColumn: true
  }
];

export const ITEMS_PER_PAGE = 10;

