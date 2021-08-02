import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    typeInput: transactionTypeOptions[0].optionId,
    transactionItemList: [],
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptions = event => {
    this.setState({typeInput: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()

    const {titleInput, amountInput, typeInput} = this.state
    const typeObject = transactionTypeOptions.find(
      each => each.id === typeInput,
    )

    const {displayText} = typeObject
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionItemList: [...prevState.transactionItemList, newTransaction],
      titleInput: '',
      amountInput: '',
      typeInput: transactionTypeOptions[0].optionId,
    }))
  }

  onDeleteTransaction = id => {
    const {transactionItemList} = this.state
    const updatedTransactionList = transactionItemList.filter(
      eachTransaction => id !== eachTransaction.id,
    )
    this.setState({
      transactionItemList: updatedTransactionList,
    })
  }

  calculateExpenses = () => {
    const {transactionItemList} = this.state
    let expensesAmount = 0
    transactionItemList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  calculateIncome = () => {
    const {transactionItemList} = this.state
    let incomeAmount = 0
    transactionItemList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  calculateBalance = () => {
    const {transactionItemList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionItemList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {transactionItemList, titleInput, amountInput, typeInput} = this.state

    const balanceAmount = this.calculateBalance()
    const incomeAmount = this.calculateIncome()
    const expensesAmount = this.calculateExpenses()
    return (
      <div className="app-bg-container">
        <div className="money-manager-bg-container">
          <div className="money-manager-header">
            <h1 className="heading">Hi, Richard</h1>
            <p className="caption">
              Welcome back to your
              <span className="caption-highlight"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balance={balanceAmount}
            income={incomeAmount}
            expenses={expensesAmount}
          />
          <div className="transaction-container">
            <form className="form" onSubmit={this.onAddTransaction}>
              <h1 className="form-heading">Add Transaction</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                className="input"
                onChange={this.onChangeTitle}
                value={titleInput}
                id="title"
                placeholder="TITLE"
              />
              <label className="label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                className="input"
                onChange={this.onChangeAmount}
                value={amountInput}
                id="amount"
                placeholder="AMOUNT"
              />
              <label className="label" htmlFor="type">
                TYPE
              </label>
              <select
                className="input"
                id="type"
                value={typeInput}
                onChange={this.onChangeOptions}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>

            <div className="history-container">
              <h1 className="history-heading">History</h1>
              <ul className="transaction-history">
                <li className="table-header">
                  <p className="table-header-cell">Title</p>
                  <p className="table-header-cell">Amount</p>
                  <p className="table-header-cell">Type</p>
                </li>
                {transactionItemList.map(eachTransaction => (
                  <TransactionItem
                    details={eachTransaction}
                    key={eachTransaction.id}
                    onDeleteTransaction={this.onDeleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
