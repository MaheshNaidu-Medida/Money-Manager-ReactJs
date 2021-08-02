import './index.css'

const MoneyDetails = props => {
  const {balance, income, expenses} = props

  return (
    <div className="money-details-container">
      <div className="money-details balance-bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="details-logo"
        />
        <div className="details">
          <p className="transaction-type">Your Balance</p>
          <p testid="balanceAmount" className="transaction-value">
            Rs {balance}
          </p>
        </div>
      </div>
      <div className="money-details income-bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
          alt="income"
          className="details-logo"
        />
        <div className="details">
          <p className="transaction-type">Your Income</p>
          <p testid="incomeAmount" className="transaction-value">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="money-details expenses-bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="details-logo"
        />
        <div className="details">
          <p className="transaction-type">Your Expenses</p>
          <p testid="expensesAmount" className="transaction-value">
            Rs {expenses}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDetails
