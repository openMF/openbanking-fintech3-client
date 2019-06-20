import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import './App.css';
import Customer from "./screens/customer";
import Login from "./screens/login";
import ApprovePayment from './screens/customer/ApprovePayment/ApprovePayment';
import PaymentComplete from './components/PaymentComplete/PaymentComplete';
import CustomerInitiatedPayment from './screens/customer/CreatePaymentRequest/CreatePaymentRequest'
// import './green-gold.scss';
// import './gold-red.scss';
// import './dark.scss';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {setBank} from "./store/bank/actions.js";
import Accounts from './screens/customer/Accounts/Accounts';
import Account from './screens/customer/Account/Account';
import BankList from './screens/customer/BankList/BankList';
import ConsentRegistration from './screens/customer/ConsentRegistration/ConsentRegistration';

const NavRootW = (props) => {
    const theme = 'elephant';
    props.setTheme(theme);
    return (<div className={`App ${theme}`}>
        <div>
            <div>
                <Switch>
                    <Route path={`/login`} component={Login} />

                    <Route exact path={`/`} render={
                        () => !props.role ?
                            <Redirect to={`/login`} /> :
                            <Redirect to={`/customer`} />
                    }/>
                    <ProtectedRoute exact path={`/customer`} component={Customer} />
                    <ProtectedRoute exact path={`/customer/accounts`} component={Accounts}/>
                    <ProtectedRoute exact path={`/customer/accounts/new`} component={BankList}/>
                    <ProtectedRoute exact path={`/customer/accounts/register/:consentId`} component={ConsentRegistration}/>
                    <ProtectedRoute path={`/customer/accounts/:accountId`} component={Account}/>
                    <ProtectedRoute path={`/customer/createPaymentRequest`} component={CustomerInitiatedPayment}/>
                    <ProtectedRoute path={`/customer/approvePayment`} component={ApprovePayment}/>
                    <ProtectedRoute path={`/customer/paymentComplete`} component={PaymentComplete}/>
                    <ProtectedRoute path={`/`} render={() => <Redirect to={`/login`} />}/>
                </Switch>
            </div>
        </div>
    </div>);
};

const NavRoot= withRouter(connect(
    (state) => ({role: state.user.role}),
    dispatch => ({setTheme: theme => dispatch(setBank(theme))})
) (NavRootW));


class App extends Component {
    render() {
        return (
            <Route path={ `/` } render={ props => <NavRoot { ...props } /> }/>
        );
    }
}

const mapStateToProps = (state) => ({
    role: state.user.role
});

export default withRouter(connect(mapStateToProps) (App));
