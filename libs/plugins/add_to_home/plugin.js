/**
 * InstallToHome [plugin]
 * by MovableApp.com
 *
 */

Ext.ns('MovableApp.plugins');
		
		
MovableApp.plugins.AddToHome = Ext.extend(Object,{
	
	debug:					false,
	installPanel:			null,
	
	delay:					100,
	animation:				Ext.anims.pop,
	
	cls:					'x-install-web-app-panel',
	modal:					true,
	hideOnMaskTap:			true,
	styleHtmlContent: 		true,
	
	
	dimension: {
		iphone: {
			portrait: {
				width:		260,
				height:		180
			},
			landscape: {
				width:		380,
				height:		160
			}
		},
		ipad: {
			width:			260,
			height:			500
		}
	},
	
	showToolbar:			false,
	toolbarTitle:			'Install This App!',
	toolbarUi:				'light',
	
	showOkButton:			false,
	okButtonText:			'Ok!',
	
	
	
	contentScroll:			true,
	contentHtml: 			'<p>Hi guy,<br>this is a WebApp and you can add it to your home following these simple instructions:</p>' +
							'<p><span class="x-install-web-app-step1"></span></p>' + 
							'<p><span class="x-install-web-app-step2"></span></p>' + 
							'',
	
	
	
	/**
	 * Inherith instance configuration.
	 */
	constructor: function(config) {
		
		Ext.apply(this,config);
		
		MovableApp.plugins.AddToHome.superclass.constructor.apply(this,arguments);	
		
	},
	
	
	/**
	 * Setup parent events handlers
	 */
	init: function(parent) {
		
		//console.log('Plugin !init');
		
		// This plugin only works on iPhone or iPad in browser mode!
		if ( !this.debug && ( !Ext.is.iOS || Ext.is.Standalone ) ) return;
		
		parent.on({
			afterrender:		this.evtParentAfterRender,
			scope:this
		});

		
	},
	
	
	/**
	 * Display the panel and its components
	 */
	evtParentAfterRender: function(ui) {
		
		//console.log('Plugin/Parent !afterrender');
		
		
		this.installPanel = new Ext.Panel({
			
			floating:				true,
			hideOnMaskTap:			this.hideOnMaskTap,
			modal:					this.modal,
			cls:					this.cls,
			
			layout:	{
				type: 'vbox',
				align:'stretch',
			},
			
			items:[{
				styleHtmlContent: 	this.styleHtmlContent,
				scroll:				this.contentScroll,
				html:				this.contentHtml,
				flex:1
			}],	
			
		});
		
		// Add a toolbar to the panel if needed
		if ( this.showToolbar ) {
			this.installPanel.addDocked({
				xtype:		'toolbar',
				title:		this.toolbarTitle,
				ui:			this.toolbarUi,
				margin:		'0 0 1 0'
			});
		}
		
		// Add an "OK" button to the bottom of the panel
		if ( this.showOkButton ) {
			
			this.installPanel.addDocked({
				dock:		'bottom',
				xtype:		'button',
				text:		this.okButtonText,
				margin:		'1 0 0 0'
			});
			
			this.installPanel.getDockedComponent(this.installPanel.getDockedItems().length-1).setHandler(function(){
				this.installPanel.hide(this.animation);
				//this.destroy();
			},this);
		}
		
		// Bind listeners to calculate size and positioning when display the window.
		this.installPanel.on({
			
			show: function(){
				this.setInstallPanelDimensions();
				this.setInstallPanelArrow();
			},
			
			orientationchange: function() {
				this.setInstallPanelDimensions();
				this.setInstallPanelArrow();
			},
			
			// Delayed self-destruption. free DOM from installPanel!
			hide: function(){
				var me = this;
				setTimeout(function(){ me.installPanel.destroy(); },2000);
			},
			
			scope: this
		});
		
		
		// Prepare the window for a delayed animated display behavior.
		var win = this.installPanel;
		win.animation = this.animation;
		
		setTimeout(function(){
			win.show(win.animation);
		},this.delay);
		
		
		
		
	},
	
	
	
	/**
	 * It calculates dimension and position of the window.
	 */
	setInstallPanelDimensions: function() {
		
		// Size
		
		if ( Ext.is.Phone && Ext.orientation == 'portrait' ) {
			this.installPanel.setWidth(this.dimension.iphone.portrait.width);
			this.installPanel.setHeight(this.dimension.iphone.portrait.height);
			
		} else if ( Ext.is.Phone && Ext.orientation == 'landscape' ) {
			this.installPanel.setWidth(this.dimension.iphone.landscape.width);
			this.installPanel.setHeight(this.dimension.iphone.landscape.height);
		
		} else {
			this.installPanel.setWidth(this.dimension.ipad.width);
			this.installPanel.setHeight(this.dimension.ipad.height);
			
		}
		
		
		// Position
		
		if ( Ext.is.Phone ) {
			this.installPanel.getEl().setTop( Ext.Element.getViewportHeight() - this.installPanel.getHeight() -20 );
			this.installPanel.getEl().setLeft( ( Ext.Element.getViewportWidth() - this.installPanel.getWidth() ) / 2 );
			
		} else {
			this.installPanel.getEl().setTop(20);
			this.installPanel.getEl().setLeft(20);
		}
		
	},
	
	
	/**
	 * It calculates dimension and position of the arrow based on window position and device
	 */
	setInstallPanelArrow: function() {
		
		// Create arrow DOM element only once.
		if ( !this.arrow ) {
			
			// Setup arrow's class from local configuration and decline it for tablet (rotate).
			var arrowCls = 'x-install-web-app-arrow';
			if ( !Ext.is.Phone ) arrowCls += ' '+arrowCls+'-tablet';
			
			this.arrow = this.installPanel.getEl().createChild({
				cls: arrowCls
			});
			
		}
		
		var top, left;
		
		if ( Ext.is.Phone ) {
			top 	= this.installPanel.getHeight();
			left 	= this.installPanel.getWidth() / 2 - this.arrow.getWidth() / 2;
			
		} else {
			top 	= 1-this.arrow.getHeight();
			left 	= 170;
		}
		
		
		this.arrow.setLeft( left );
		this.arrow.setTop( top );

		
	}
	
});