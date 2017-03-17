window.onload = function(ev){

	var lastEditRange;
	// 编辑框点击事件
	var editObj = {"win" : $("#ueditor_0")[0].contentWindow, "doc" : $("#ueditor_0")[0].contentDocument };

	editObj.doc.body.addEventListener("click", function() {
		var selection = editObj.win.getSelection();
		lastEditRange = selection.getRangeAt(0);
	}, false);
	
	// 编辑框按键弹起事件
	editObj.doc.body.addEventListener("keyup", function() {
		// 获取选定对象
		var selection = editObj.win.getSelection();
		// 设置最后光标对象
		lastEditRange = selection.getRangeAt(0);
	}, false);

	$("#js_toolbar_0").append("<div id='tool_code' class='edui-box edui-button edui-default edui-for-formatmatch'></div>");
	$(document.body).append("<div id='code_bg'><div id='code_dlg' style=''><div id='code_close'>×</div><p><label for='lang'>Language</label><input type='text' required id='lang' value='c'><label for='width'>Min Width</label><input type='number' required id='width' value='400'><button id='preview'>Insert</button></p><p><textarea name='code' cols='30' rows='10' id='code_txt'></textarea></p></div></div><div id='result'><pre style='overflow-x:auto;'><code id='view' style='font-size: 0.85em;font-family: Consolas, Menlo, Courier, monospace;margin: 0px 0.15em;padding: 0px 0.3em;white-space: pre-wrap;display: inline;white-space: pre;overflow: auto;padding: 0.5em 0.7em;display: block !important;display: block;overflow-x: auto;padding: 0.5em;color: #abb2bf;text-size-adjust: none;'></code></pre>");
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
	$("#preview").click(function(){
		var lang = $("#lang").val();
		var code = $("#code_txt").val().replace(/\t/g, "  ").trim();
		if("" == code) return false;
		var width = $("#width").val();
		$("#view").attr("class", lang);
		$("#view").text(code);
		if("" != width) $("#view").css("min-width", width + "px");
		hljs.highlightBlock(document.getElementById("view"));
		$("#result .hljs").each(function(){ 
			this.style.background = $(this).css("background");
			this.style.color = $(this).css("color"); 
			this.style.fontWeight = $(this).css("font-weight"); 
			$(this).find("[class*='hljs']").each(function(){ 
				this.style.color = $(this).css("color"); 
				this.style.fontWeight = $(this).css("font-weight"); 
				this.style.fontStyle = $(this).css("font-style"); 
			}) 
		});
		$("#result .hljs").each(function(){
			$(this).html($(this).html().replace(/\n/g, "<br/>"));
		});
		var code = $("#result").html().trim()

		var edit = editObj.doc.body;
		edit.focus();
		var selection = editObj.win.getSelection();
		if (lastEditRange) {
			selection.removeAllRanges();
			selection.addRange(lastEditRange);
		}
		if (selection.anchorNode.nodeName != '#text') {
			var codeNode = editObj.doc.createElement("span");
			codeNode.innerHTML = code;
			
			if (edit.childNodes.length > 0) {
				selection.anchorNode.appendChild(codeNode);
			} else {
				edit.appendChild(codeNode);
			}
			var range = editObj.doc.createRange();
			range.selectNodeContents(codeNode);
			range.setStart(codeNode, 0);
			range.collapse(true);
			selection.removeAllRanges();
			selection.addRange(range);
		} else {
			var codeNode = editObj.doc.createElement("span");
			codeNode.innerHTML = code;
			var range = selection.getRangeAt(0);
			var textNode = range.startContainer;
			var rangeStartOffset = range.startOffset;
			textNode.parentNode.insertBefore(codeNode, textNode.nextSibling);
			range.setStart(textNode, textNode.length);
			range.collapse(true);
			selection.removeAllRanges();
			selection.addRange(range);
		}
		lastEditRange = selection.getRangeAt(0);
		$("#code_bg").hide();
		$("#code_txt").val("");
	});

	TextAreaTab.Register(document.getElementById('code_txt')); // 实现编辑框Tab功能 

}

// 注册Tab代码缩进功能
var TextAreaTab = 
{ 
   Register : function(obj) 
   { 
       obj.onkeydown = new Function('TextAreaTab.InsertTab(this)'); 
   }, 
   InsertTab : function(obj) 
   { 
       var evt = this.GetEvent(); // 返回 event 对象 
       if (evt.keyCode == 9) // 按下了Tab键 
       { 
           if (obj.createTextRange && obj.InsertPosition) // IE 
           { 
               // 赋予对象内容 
               obj.InsertPosition.text = '\t'; 
               evt.returnValue = false; 
           } 
           else if (window.getSelection) // FF 
           { 
               var scrollTop = obj.scrollTop; // 滚动的位置 
               var start = obj.selectionStart; // 当前光标所在位置 

               var pre = obj.value.substr(0, obj.selectionStart); // 光标之前的内容 
               var next = obj.value.substr(obj.selectionEnd); // 光标之后的内容 
               obj.value = pre + '\t' + next; 

               evt.preventDefault(); 
               // 设置光标在插入点之后的位置 
               obj.selectionStart = start + 1; 
               obj.selectionEnd = start + 1; 
               obj.scrollTop = scrollTop; 
           } 
       } 
   }, 
   // 返回 event 对象 
   GetEvent : function() 
   { 
       if(document.all) // IE 
       { 
           return window.event; 
       } 

       func = this.GetEvent.caller; 
       while(func != null) 
       { 
           var arg0 = func.arguments[0]; 
           if(arg0) 
           { 
               if((arg0.constructor == Event || arg0.constructor == MouseEvent) 
                   ||(typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) 
               { 
                   return arg0; 
               } 
           } 
           func = func.caller; 
       } 
       return null; 
   } 
} 