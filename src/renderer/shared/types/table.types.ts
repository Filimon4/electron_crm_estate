
export interface ITableData {
  selected: any
  setSelected: (...args: any) => void
  data: any[]
  openModal: (...args: any) => void
  totalPages: number
  currentPage: number
  onNextPage: () => void
  onPrevPage: () => void
}