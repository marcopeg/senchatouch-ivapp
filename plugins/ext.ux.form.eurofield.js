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

Ext.ns('Ext.ux.form');

Ext.ux.form.EuroField = Ext.extend(Ext.form.Text,{
	
	// Internal store for digits in control.
	digits: "0",
	
	useClearIcon:true,
	
	renderTpl: [
		'<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
		'<tpl if="fieldEl"><div class="x-form-field-container">',
			'<input id="{inputId}" type="{inputType}" name="{name}" pattern="[0-9]*" class="{fieldCls}"',
				'<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
				'<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
				'style="text-align:right;{style}" ',
				'<tpl if="minValue != undefined">min="{minValue}" </tpl>',
				'<tpl if="maxValue != undefined">max="{maxValue}" </tpl>',
				'<tpl if="stepValue != undefined">step="{stepValue}" </tpl>',
				'<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
				'<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
				'<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>',
			'/>',
			'<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
			'</div></tpl>',
		'<tpl if="useClearIcon"><div class="x-field-clear-container"><div class="x-field-clear x-hidden-visibility">&#215;</div><div></tpl>'
	],
	
	
	
	onRender: function() {
		
		// Setup the correct float value for initialized field.
		if ( !this.value ) this.value = 0;
		this.digits = ""+this.value;
		this.value = Ext.util.Numbers.toFixed(this.value/100,2);
		
		
		Ext.ux.form.EuroField.superclass.onRender.apply(this, arguments);
		
		
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
		
		var val = Ext.ux.form.EuroField.superclass.getValue.apply(this);
    	
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

Ext.reg('eurofield', Ext.ux.form.EuroField );