/**
 * IVApp - Calcolo veloce dell'IVA
 * by MovableApp.com
 *
 * @author: Marco Pegoraro
 * @docs: http://movableapp.com/ivapp/
 * 
 * IMPORTANT: This application is not intended to be a "coding best practice". 
 * You can rebuild it in an MVC way.
 * We focused on user interface to be minimalistic and self explanatory.
 * 
 * We built a new component EUROFIELD to implement a custom field inspired by the MoneyWell(r) input UI.
 * (details about the component in its file)
 */

Ext.setup({
	
	// Application settings
	tabletStartupScreen: 	'images/tablet_startup.png',
    phoneStartupScreen: 	'images/phone_startup.png',
	icon:					'images/icon.png',
	glossOnIcon:			false,
	
	
	
	onReady: function() {
		
		var viewport, ivaPanel, infoPanel, calcolo, reset, resultsTpl, infoHTML;
		
		// Support text.
		// This text is shown to help user within the application.
		// This text will be replaced by the results panel.
		infoHTML = '<span class="x-ivapp-info">Inserisci l\'importo in centesimi di euro di cui vuoi calcolare o scorporare l\'IVA quindi clicca su "Calcola!"</span>';
		
		// Results panel template.
		resultsTpl = new Ext.XTemplate(
			'<div class="x-ivapp">',
				'<h3>Calcolo IVA:</h3>',
				'<table border="1" style="background:#fff">',
					'<thead>',
						'<tr>',
							'<th class="importo">{importo}<em>&euro;</em></th>',
							'<th>4%</th>',
							'<th>10%</th>',
							'<th class="iva-old">20%</th>',
							'<th>21%</th>',
						'</tr>',
					'</thead>',
					'<tbody>',
						'<tr>',
							'<th>Iva:</th>',
							'<td>{iva4}<em>&euro;</em></td>',
							'<td>{iva10}<em>&euro;</em></td>',
							'<td class="iva-old">{iva20}<em>&euro;</em></td>',
							'<td>{iva21}<em>&euro;</em></td>',
						'</tr>',
						'<tr>',
							'<th>Tot:</th>',
							'<td>{tot4}<em>&euro;</em></td>',
							'<td>{tot10}<em>&euro;</em></td>',
							'<td class="iva-old">{tot20}<em>&euro;</em></td>',
							'<td>{tot21}<em>&euro;</em></td>',
						'</tr>',
					'</tbody>',
				'</table>',
				
				'<h3>Scorporo IVA:</h3>',
				'<table border="1" style="background:#fff">',
					'<thead>',
						'<tr>',
							'<th class="importo">{importo}<em>&euro;</em></th>',
							'<th>4%</th>',
							'<th>10%</th>',
							'<th class="iva-old">20%</th>',
							'<th>21%</th>',
						'</tr>',
					'</thead>',
					'<tbody>',
						'<tr>',
							'<th>Iva:</th>',
							'<td>{siva4}<em>&euro;</em></td>',
							'<td>{siva10}<em>&euro;</em></td>',
							'<td class="iva-old">{siva20}<em>&euro;</em></td>',
							'<td>{siva21}<em>&euro;</em></td>',
						'</tr>',
						'<tr>',
							'<th>Tot:</th>',
							'<td>{stot4}<em>&euro;</em></td>',
							'<td>{stot10}<em>&euro;</em></td>',
							'<td class="iva-old">{stot20}<em>&euro;</em></td>',
							'<td>{stot21}<em>&euro;</em></td>',
						'</tr>',
					'</tbody>',
				'</table>',
			'</div>'
		);
		
		
		
		
		
		
		/**
		 * LOGIC
		 */
		
		calcolo = function() {
			
			// Fetch the base for calculation from the form
			var importo = Ext.getCmp('importoFld').getValue();
			Ext.getCmp('importoFld').blur();
			
			// Do not accept null values. We alert our user!
			if ( isNaN(importo) || importo == 0 ) {
				Ext.Msg.alert('Prego inserire un valore!');
				return;
			}
			
			// Calcolo IVA
			var iva4 	= importo * 0.04
			var iva10	= importo * 0.10
			var iva20	= importo * 0.20
			var iva21	= importo * 0.21
			
			var tot4	= importo + iva4;
			var tot10	= importo + iva10;
			var tot20	= importo + iva20;
			var tot21	= importo + iva21;
			
			// Scorporo IVA
			var stot4	= importo / 1.04
			var stot10	= importo / 1.10
			var stot20	= importo / 1.20
			var stot21	= importo / 1.21
			
			var siva4	= importo - stot4;
			var siva10	= importo - stot10;
			var siva20	= importo - stot20;
			var siva21	= importo - stot21;
			
			Ext.getCmp('resultsCmp').update({
				importo:		Ext.util.Numbers.toFixed(importo,2),
				
				iva4:			Ext.util.Numbers.toFixed(iva4,2),
				iva10:			Ext.util.Numbers.toFixed(iva10,2),
				iva20:			Ext.util.Numbers.toFixed(iva20,2),
				iva21:			Ext.util.Numbers.toFixed(iva21,2),
				tot4:			Ext.util.Numbers.toFixed(tot4,2),
				tot10:			Ext.util.Numbers.toFixed(tot10,2),
				tot20:			Ext.util.Numbers.toFixed(tot20,2),
				tot21:			Ext.util.Numbers.toFixed(tot21,2),
				
				siva4:			Ext.util.Numbers.toFixed(siva4,2),
				siva10:			Ext.util.Numbers.toFixed(siva10,2),
				siva20:			Ext.util.Numbers.toFixed(siva20,2),
				siva21:			Ext.util.Numbers.toFixed(siva21,2),
				stot4:			Ext.util.Numbers.toFixed(stot4,2),
				stot10:			Ext.util.Numbers.toFixed(stot10,2),
				stot20:			Ext.util.Numbers.toFixed(stot20,2),
				stot21:			Ext.util.Numbers.toFixed(stot21,2)
			});
			
		};
		
		reset = function( ui ) {
			Ext.getCmp('resultsCmp').update(infoHTML);
		};
		
		
		
		
		
		
		
		
		
		
		/**
		 * USER INTERFACE
		 */
		
		// Operating Panel
		ivaPanel = new Ext.Panel({
			layout: {
				type:'vbox',
				align:'stretch',
			},
			
			items: [
				// The form
				{
					xtype:'formpanel',
					layout: {
						type:'vbox',
						align:'stretch',
						pack:'left'
					},
					items: [
						{
							xtype:'fieldset',
							margin:'0 0 5 0',
							flex:1,
							items: [
								{
									xtype:'eurofield',
									label:'Importo:',
									id:'importoFld',
									inputCls:'x-ivapp-input',
									listeners: {
										cleared: reset
									}
								}
							]
						},
						{
							xtype:'button',
							text:'Calcola!',
							handler: calcolo
						}
					]
				},
				
				// The results
				{
					id:'resultsCmp',
					layout:'fit',
					scroll:'vertical',
					styleHtmlContent:true,
					flex:1,
					tpl: resultsTpl,
					html: infoHTML
				}
			],
		});
		
		
		// Info panel
		// Content is fetched from the DOM
		// http://www.movableapp.com/2011/09/sencha-touch-panel-content-from-template/
		infoPanel = new Ext.Panel({
			layout:'fit',
			scroll:'vertical',
			styleHtmlContent:true,
			tpl: new Ext.Template.from('info'),
			data:{}
		});
		
		
		// Main View
		// Link all UI items togheter, provide a toolbar with a title and a mechanism to switch throught cards.
		viewport = new Ext.Panel({
			
			fullscreen:true,
			layout:'card',
			
			items: [
				ivaPanel,
				infoPanel,
			],
			
			dockedItems: [{
				xtype:'toolbar',	
				title:'IVA App',
				items: [
					{
						iconCls:'home',
						iconMask:true,
						ui:'back',
						id:'btnBack'
					},
					{ xtype:'spacer' },
					{
						iconCls:'info',
						iconMask:true,
						id:'btnInfo'
					}
				]
			}],
			
			// Configuration of "Add To Home Plugin".
			plugins: [
				new MovableApp.plugins.AddToHome({
					delay:100,
					dimension: {
						iphone: {
							portrait: {
								width:		260,
								height:		160
							},
							landscape: {
								width:		380,
								height:		140
							}
						},
						ipad: {
							width:			260,
							height:			380
						}
					},
					contentHtml: 			'<p>Aggiungi questa applicazione alla <strong>home screen</strong> seguendo queste semplici istruzioni:</p>' +
											'<p><span class="x-install-web-app-step1"></span></p>' + 
											'<p><span class="x-install-web-app-step2"></span></p>' + 
											'',
				})
			],
			
			
			// UI Actions
			listeners: {
				
				// This event intercept desktop usage and wrap the UI in a
				// modal window whith iPhone dimensions
				beforerender: function() {
					
					if ( !Ext.is.Phone ) {
						Ext.apply(this,{
							fullscreen: false,
							floating:true,
							width:320,
							height:460,
							centered: true,
							modal:true,
							hideOnMaskTap:false
						});
					}
					
				},
				
				render: function() {
					
					
					
					// Display Info Card
					Ext.getCmp('btnInfo').setHandler(function(){
						
						viewport.setActiveItem(1,Ext.anims.flip);
						
						Ext.getCmp('btnInfo').setVisible(false);
						Ext.getCmp('btnBack').setVisible(true);
						
					});
					
					// Display Calculating Card
					Ext.getCmp('btnBack').setHandler(function(){
						
						viewport.setActiveItem(0,Ext.anims.flip);
						
						Ext.getCmp('btnInfo').setVisible(true);
						Ext.getCmp('btnBack').setVisible(false);
						
					});
					
					Ext.getCmp('btnBack').setVisible(false);
					
				}
				
			}
			
			
			
		});
		
		
		viewport.show();
		
	}
	
});