window.onload = function(ev){
	$("#js_toolbar_0").append("<div id='tool_code' class='edui-box edui-button edui-default edui-for-formatmatch'></div>");
	$(document.body).append("<div id='code_bg'><div id='code_dlg' style=''><div id='code_close'>×</div><p><label for='lang'>Language</label><input type='text' id='lang' value='c'><label for='width'>Min Width</label><input type='text' id='width' value='400'></p><p><textarea name='code' cols='30' rows='10' id='code'></textarea></p><p><input type='submit' value='插入' name='preview' id='preview'></p></div></div>");
	$("#tool_code").click(function(ev){
		$("#code_bg").show();
	});
	$("#tool_code").mouseover(function(){
		var o = {top: $("#tool_code").offset().top - 25, left: $("#tool_code").offset().left - 22};
		$(".tooltip").css(o);
		$(".tooltip_inner").text("插入代码");
		$(".tooltip").show();
	});
	$("#tool_code").mouseout(function(){
		$(".tooltip").hide();
	});
	$("#code_close").click(function(){
		$("#code_bg").hide();		
	});
}