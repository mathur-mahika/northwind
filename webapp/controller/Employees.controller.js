sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "northwind/model/formatter",
    "sap/m/MessageToast"
], (Controller, Filter, FilterOperator, formatter, MessageToast) => {
    "use strict";
//order of args in the arrow func should be the same as the depndencies provided

    return Controller.extend("northwind.controller.Employees", {
        
        //var : component
        formatter : formatter,

        onInit() {
        },

        onFilter : function() {

            //fetching from input field
            const employeeID = this.byId("EmployeeID").getValue();
            const country = this.byId("Country").getValue();
            const date = this.byId("DRS");
            const startDate = date.getDateValue();
            const endDate = date.getSecondDateValue();

            const filters = [];

            if(employeeID) {
                const IDFilter = new Filter("EmployeeID", FilterOperator.EQ, employeeID);
                filters.push(IDFilter);
            }

            if(country) {
                const CountryFilter = new Filter("Country", FilterOperator.Contains, country);
                filters.push(CountryFilter);
            }

            if(startDate && endDate) {
                const dateFilter = new Filter("HireDate", FilterOperator.BT, startDate, endDate);
                filters.push(dateFilter);
            }

            const binding = this.byId("employeesTable").getBinding("items");

            binding.filter(filters);


        },


        onPress : function(oEvent) {


            const oItem = oEvent.getParameter("listItem");

            const oContext = oItem.getBindingContext();

            const firstName = oContext.getProperty("FirstName");
            const lastName = oContext.getProperty("LastName");

            MessageToast.show(`Employee Name is ${firstName} ${lastName}`);

        },
    
        onClearFilter : function() {
            const employeeID = this.byId("EmployeeID").setValue("");
            const country = this.byId("Country").setValue("");
            const date = this.byId("DRS").setValue("");

            const filters = [];
            filters.push(employeeID, country, date);

            const binding = this.byId("employeesTable").getBinding("items");

            binding.filter(filters);

        }
    });
});