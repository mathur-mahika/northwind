sap.ui.define([
  "sap/ui/core/format/DateFormat"
], (DateFormat) => {
  "use strict";

  return {

    formatDate : function(oDate) {
        
        if(!oDate){
            return "";
        }

        oDate = oDate instanceof Date ? oDate : new Date(oDate);

        const oDateFormat = DateFormat.getDateInstance({
            pattern : "dd-MMM-yyyy"
        });

        return oDateFormat.format(oDate);
    }
      
  }
});