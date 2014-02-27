function TPLBackgroundlayerstoolbar (option) {
	this.option = option;
}

TPLBackgroundlayerstoolbar.prototype.init = function(){
	if (this.option === "default") {
		$("#backgroundlayerstoolbar").attr('data-type', 'horizontal').attr('data-iconpos', 'left');		
	}
	
	if (this.option === "gallery") {
		$("#backgroundlayerstoolbar").attr('data-role', 'collapsible').attr('data-theme', 'b');		
		$("#backgroundlayerstoolbar").append('<h4>'+i18n.t("map.baselayers")+'</h4><ul id="basemapslist" data-role="listview" ></ul>');
	}
	return this;	
}

TPLBackgroundlayerstoolbar.prototype.create = function(){
	if (this.option === "default") {		
		$("#backgroundlayerstoolbar").controlgroup();
		$("#backgroundlayerstoolbar").trigger("create");
		$("#backgroundlayerstoolbar").controlgroup("refresh");
		//hack jquerymobile 1.3.2
		$("#backgroundlayerstoolbar").navbar();
	}
	if (this.option === "gallery") {
		$("#basemapslist").trigger("create");
		$("#basemapslist").listview();
		$("#backgroundlayerstoolbar").collapsible();
        $("#backgroundlayerstoolbar a:first").attr("tabindex","3").attr("accesskey","3");		
	}
}

function TPLBackgroundLayerControl (layer, option) {
	this.option = option;
	this.layer = layer;
}

TPLBackgroundLayerControl.prototype.html = function(){
	var template = "";
	if (this.option === "default") {
		template = ['<a href="#" id="' + this.layer.attr("id") + '_btn" title="' + this.layer.attr("title"),
			'" onclick="mviewer.setBaseLayer(\'' + this.layer.attr("id") + '\')"',
			'data-theme="b" data-role="button">' + this.layer.attr("label") + '</a>'].join(" ");        
		$("#backgroundlayerstoolbar").append(template);
	}
	if (this.option === "gallery") {
		template = ['<li data-theme="b" onclick="mviewer.setBaseLayer(\'' +  this.layer.attr("id") + '\')">',
			'<a id="' + this.layer.attr("id") + '_btn" href="#"><img src="' +  this.layer.attr("thumbgallery") + '" />',
			'<h3>' +  this.layer.attr("label") + '</h3>',
			'<p>' + this.layer.attr("title") + '</p></a></li>'].join(" ");
		$("#basemapslist").append(template);
	}
	
}

function TPLLayergroup(title, layerlist, collapsed){   
   this.title = title;
   this.collapsed = collapsed;
   this.layerlist = layerlist;
}

TPLLayergroup.prototype.html = function(){
	return ['<div data-theme="b" data-role="collapsible" data-collapsed="'+this.collapsed+'">',
						'<h2>'+this.title+'</h2>',    
						'<ul data-role="listview" data-split-icon="gear" data-split-theme="b" data-inset="true" data-mini="true" data-theme="a">',		
						this.layerlist,
						'</ul>',
					'</div>'].join(" ");
}

function TPLLayercontrol(layerid, title, legendurl, queryable, checked, enabled){   
   this.layerid = layerid;
   this.title = title;   
   this.queryable = queryable;
   this.legendurl = legendurl;
   this.checked = checked;
   this.enabled = enabled;   
}

TPLLayercontrol.prototype.html = function(){
	return  ['<li data-theme="a" data-icon="false"><a href="#">',
						'<h3 class="layerdisplay-title">',
							'<table style="width:100%;" >',
									'<tbody>',
										'<tr>',
											'<td>'+this.title+'</td>',                                  
											//'<td><div data-role="controlgroup" data-type="horizontal" data-mini="true" class="ui-btn-right" style="float:right;">',
                                            '<td><div class="ui-nodisc-icon ui-alt-icon" style="float:right;">',
												'<a class="opacity-btn ui-btn ui-shadow ui-corner-all ui-icon-gear ui-btn-icon-notext ui-btn-a ui-btn-inline" id ="opacity-btn-'+this.layerid+'" name="'+this.layerid+'" href="#"  title="'+i18n.t("layerpanel.layeropacity")+'"></a>',
												'<a class="metadata-btn ui-btn ui-shadow ui-corner-all ui-icon-bars ui-btn-icon-notext ui-btn-a ui-btn-inline" id="metadata-btn-'+this.layerid+'" name="'+this.layerid+'" href="#"  title="'+i18n.t("layerpanel.moreinformation")+'" ></a>',												
											'</div></td>',		
										 '</tr>',
									'</tbody>',
							 '</table>',
						'</h3>',						
						'<form class="layer-display" title="'+i18n.t("layerpanel.displayhidelayer")+'">',
						'<input data-theme="a" class="togglelayer" type="checkbox"  data-mini="true" name="'+this.layerid+'" id="checkbox-mini-'+this.layerid+'"',
							(this.checked===true)?' checked="checked"':'',
						'>',
						'<label for="checkbox-mini-'+this.layerid+'">',
							'<table style="width:100%;" >',
								'<tbody>',
									'<tr>',
										'<td><img src="'+this.legendurl+'"></td>',
										//(this.queryable===true)?'<td><img class="infoicon" src="img/info/info.png"></td>':'',
									'</tr>',                            
								'</tbody>',
							'</table>',                
						'</label>',
						'</form>',						
						'</a>',             
					'</li>'].join( " ");
}
