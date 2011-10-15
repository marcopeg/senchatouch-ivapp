/**
 * EUROFIELD FORM COMPONENT
 * by MovableApp.com
 * 
 * This component is an input field with input control.
 * Only digits are allowed (on mobile devices) and you have not to insert any symbol to define decimals.
 * 
 * If you want to digit "10,00" simple input "1000". The component use the last 2 digits as decimals.
 * 
 * I think this code may be updated.
 */

Ext.ns('MovableApp.ux.form');

MovableApp.ux.form.EuroField = Ext.extend(Ext.form.Text,{
	
	// Internal store for digits in control.
	digits: "0",
	
	useClearIcon:true,
	
	onRender: function() {
		
		// Setup the correct float value for initialized field.
		if ( !this.value ) this.value = 0;
		this.digits = ""+this.value;
		this.value = Ext.util.Numbers.toFixed(this.value/100,2);
		
		MovableApp.ux.form.EuroField.superclass.onRender.apply(this, arguments);
		
		// Setup pattern & text-alignment
		var input = Ext.get(this.getEl().query('input')[0]);
		input.dom.pattern = '[0-9]*';
		input.applyStyles('text-align:right');
		
		// Cleared behavior
		this.getEl().on({
			tap: this._tapped,
			scope: this
		});
		
    },
    
    
    onKeyUp: function(e,dom) {
		
		var keyCode = e.browserEvent.keyCode;
		
		if ( keyCode >= 48 && keyCode <= 57 ) {
			this._quequeDigit( keyCode - 48 );
		}
		
		if ( keyCode >= 96 && keyCode <= 105 ) {
			this._quequeDigit( keyCode - 96 );
		}
		
		if ( keyCode == 8 ) this._removeDigit();
		
    },
    
    
    // Get a float value with 2 decimals
    getValue: function() {
		
		var val = MovableApp.ux.form.EuroField.superclass.getValue.apply(this);
    	
    	val = parseFloat(val);
    	
    	val = parseFloat(Ext.util.Numbers.toFixed(val,2));
    	
    	return val;
    	
    },

	_tapped: function() {
		
		var me = this;
		
		var val1, val2;
		val1 = me.getValue();
		val2 = val1;
		
		
		setTimeout(function(){
			
			val2 = me.getValue();
			
			if ( isNaN(val1) ) val1 = 0;
			if ( isNaN(val2) ) val2 = 0;
			
			if ( val2 == 0 && val1 == val2 ) {
				me.digits = "0";
				me.fireEvent('cleared',me);
			}
			
		},50);
		
	},
	
	_quequeDigit: function( digit ) {
		
		if ( this.digits == "0" ) this.digits = "";
		
		this.digits += ''+digit;
		
		this._updateDisplay();
	},
	
	_removeDigit: function() {
		
		if ( this.digits.length > 0 ) this.digits = this.digits.substr(0,this.digits.length-1);
		
		if ( this.digits.length <= 0 ) this.digits = "0";
		
		this._updateDisplay();
		
	},
	
	_updateDisplay: function() {
		
		var intv = parseInt(this.digits);
		var floatv = intv / 100;
		
		this.getEl().query('input')[0].value = Ext.util.Numbers.toFixed(floatv,2);
		
	}
	
});

Ext.reg('eurofield', MovableApp.ux.form.EuroField );