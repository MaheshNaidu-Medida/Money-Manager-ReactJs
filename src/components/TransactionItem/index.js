import './index.css'

const TransactionItem = props => {
  const {details, onDeleteTransaction} = props
  const {title, amount, type, id} = details
  const onClickDelete = () => onDeleteTransaction(id)

  return (
    <li className="transaction-item">
      <p className="item">{title}</p>
      <p className="item">Rs {amount}</p>
      <p className="item">{type}</p>
      <button
        testid="delete"
        className="delete-button"
        type="button"
        onClick={onClickDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}
export default TransactionItem
