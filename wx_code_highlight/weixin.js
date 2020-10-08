window.onload = check;

function check(){
	if ($('#ueditor_0').length > 0) {
		init()
	} else {
		setTimeout(check, 500);
	}
}

let code_icon = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 595.3 595.3" style="enable-background:new 0 0 595.3 595.3;" xml:space="preserve">
<g id="XMLID_28_">
	<path id="XMLID_29_" d="M48.1,292v-7c11.6-1.7,21.3-4.9,29-9.6c6.7-4,11.4-9.4,14.2-16c2.8-6.6,4.2-15.9,4.2-27.8l-0.3-32.3
		l-1-51.8c0-33.3,2.3-56.8,6.8-70.7c4.1-12.4,10.3-22.2,18.5-29.4c8.3-7.2,18.7-11.9,31.4-14.1c10-1.9,19.5-2.9,28.5-2.9l13.1-0.3
		l4.8-0.3v9c-9.2,0.6-16.2,1.8-21,3.5c-4.8,1.7-9.6,4.6-14.2,8.6c-5.8,4.9-10.1,10.5-13,16.6s-4.8,14.1-5.6,23.7
		c-0.6,6.8-1,21.2-1,43.2l0.3,59.2c0,24.7-1,41.7-3.1,50.9c-2,9.2-6.6,17.6-13.7,25.3c-8.4,9-19.8,14.7-34.2,17.3v2.7
		c12.5,1.7,23,6.8,31.6,15.4c6.7,6.4,11.4,14.1,14.3,23.2c2.9,9.1,4.4,20.7,4.4,34.8l0.3,33.3v67.6c0,23.7,1,40.6,3,50.6
		c2,10,6.1,18.5,12.3,25.3c4.7,5.3,10.6,9.5,17.6,12.5c7,3,14.3,4.5,21.8,4.5v8.6l-7-0.3c-23.1,0-41.2-2.5-54.5-7.4
		c-14.4-5.6-25-15.4-31.9-29.6c-6.9-14.2-10.3-33.3-10.3-57.5l0.3-34.6l1-53.1l1-37.8c0-17.1-3.6-29.7-10.8-37.8
		C77.8,299.3,65.5,294.2,48.1,292z"/>
	<path id="XMLID_31_" d="M547.2,292c-17.2,2.1-29.4,7.3-36.7,15.4c-7.3,8.1-11,20.6-11,37.5l1,38.1l1,53.1l0.3,35.2
		c0,23.9-3.4,42.9-10.3,57c-6.9,14.1-17.5,23.9-31.9,29.5c-13.3,4.9-31.5,7.4-54.4,7.4l-7.4,0.3v-8.6c7.7,0,15.1-1.5,22.1-4.5
		c7-3,12.8-7.2,17.6-12.5c7.7-8.5,12.4-21.6,14.2-39.1c0.9-6.6,1.3-26.4,1.3-59.3v-45.2l0.3-33.3c0-14.1,1.4-25.7,4.3-34.8
		c2.9-9.1,7.7-16.8,14.3-23.2c8.8-8.5,19.3-13.7,31.6-15.4V287c-14.4-2.6-25.8-8.3-34.2-17.3c-7.1-7.7-11.7-16.1-13.7-25.3
		c-2-9.2-3.1-26.3-3.1-51.5l0.3-48.3v-13.8c0-19.6-0.3-32.8-1-39.7c-0.9-9.6-2.7-17.5-5.6-23.7c-2.9-6.2-7.2-11.7-13-16.6
		c-4.7-4.1-9.5-6.9-14.3-8.6c-4.8-1.7-11.9-2.9-21.1-3.5v-9l4.8,0.3l13.2,0.3c9,0,18.6,1,28.7,2.9c12.7,2.1,23.1,6.8,31.4,14.1
		c8.3,7.2,14.4,17.1,18.5,29.4c4.5,13.9,6.8,37.2,6.8,70l-1,52.4l-0.3,32.6c0,11.9,1.4,21.2,4.2,27.7c2.8,6.5,7.5,11.8,14.2,15.8
		c7.7,4.7,17.4,7.9,29,9.6V292z"/>
</g>
</svg>`

function init() {
	var lastEditRange;
	// 编辑框点击事件
	var editObj = {'win' : $('#ueditor_0')[0].contentWindow, 'doc' : $('#ueditor_0')[0].contentDocument, cur: null };

	function loadStyle(name) {
		if(editObj.link) document.head.removeChild(editObj.link);
		var link = document.createElement('link'); //创建一个link元素节点
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', 'https://highlightjs.org/static/demo/styles/' + name + '.css');
		document.head.appendChild(link);
		editObj.link = link;
	}

	loadStyle('atom-one-dark')

	editObj.doc.body.addEventListener('click', function() {
		var selection = editObj.win.getSelection();
		lastEditRange = selection.getRangeAt(0);
	}, false);
	
	// 编辑框按键弹起事件
	editObj.doc.body.addEventListener('keyup', function() {
		// 获取选定对象
		var selection = editObj.win.getSelection();
		// 设置最后光标对象
		lastEditRange = selection.getRangeAt(0);
	}, false);

	var styles = [
		'agate',
		'androidstudio',
		'atom-one-dark',
		'atom-one-light',
		'color-brewer',
		'default',
		'dracula',
		'github',
		'mono-blue',
		'monokai-sublime',
		'railscasts',
		'rainbow',
		'solarized-dark',
		'solarized-light',
		'tomorrow',
		'vs',
		'zenburn'
	]

	$('#js_toolbar_0').append('<div id="tool_code" class="edui-box edui-button edui-default edui-for-formatmatch"></div>');
	$(document.body).append(`
	<div id="code_bg">
		<div id="code_dlg" style="">
			<div id="code_close">×</div>
			<p class="tools">
				<label for="lang">语言</label> <input type="text" required id="lang" value="c">\
				<label for="style">高亮主题</label> 
				<select id="style">
					${styles.map(s => `<option ${s == 'atom-one-dark' ? 'selected': ''} value=${s}>${s}</option>`).join('')}
				</select>
				<button id="preview">插入</button>
			</p>
			<p class="codes">
				<textarea name="code" cols="30" rows="10" id="code_txt"></textarea>
			</p>
		</div>
	</div>
	<div id="result">
		<pre style="overflow-x:auto;">
			<code id="view" style="
				font-size: 0.85em;
				font-family: Consolas, Menlo, Courier, monospace;
				margin: 0px 0.15em;
				white-space: pre;
				overflow: auto;
				display: block;
				overflow-x: auto;
				padding: 0.5em;
				color: #abb2bf;
				text-size-adjust: none;
			"></code>
		</pre>
	</div>`);

	$('#lang').val(localStorage.getItem('wx-hl-code') || 'c');


	$('#style').change(function(ev) {
		loadStyle($('#style').val())
	})

	$('#tool_code').click(function(ev){
		var sel = editObj.win.getSelection();
		if($(sel.anchorNode).attr('data-wx-hl-code') || $(sel.anchorNode).parents('[data-wx-hl-code]').attr('data-wx-hl-code')) {
			var code = $(sel.anchorNode).attr('data-wx-hl-code') || $(sel.anchorNode).parents('[data-wx-hl-code]').attr('data-wx-hl-code');
			var lang = $(sel.anchorNode).attr('data-wx-hl-lang') || $(sel.anchorNode).parents('[data-wx-hl-lang]').attr('data-wx-hl-lang');
			var style = $(sel.anchorNode).attr('data-wx-hl-style') || $(sel.anchorNode).parents('[data-wx-hl-style]').attr('data-wx-hl-style');
			$('#code_bg').show();
			$('#lang').val(lang);
			$('#style').val(style);	
			$('#code_txt').val(code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<br(\/|)>/g, '\n'));	
			editObj.cur = $(sel.anchorNode).parents('pre')
		}
		else if (sel.rangeCount && sel.toString() != '') {
			if ($(sel.anchorNode).parents('[data-wx-hl-inline]').attr('data-wx-hl-inline')) {
				var span = $(sel.anchorNode).parents('[data-wx-hl-inline]')
				var code = span.text();
				span.html(code);
				span.removeAttr('data-wx-hl-inline');
				return;
			}
			var text = sel.toString()
			sel.deleteFromDocument();
			var r = sel.getRangeAt(0);
			var selFrag = r.cloneContents();
			var span = document.createElement('span');
			var code = document.createElement('code');
			$(code).css({
				backgroundColor: '#d5d5d5',
				padding: '2px 5px',
				borderRadius: '4px',
				fontFamily: '"Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", monospace',
				margin: '5px'
			});
			$(span).attr('data-wx-hl-inline', true);
			code.innerText = text;
			span.appendChild(code);
			r.insertNode(span);
			return;
		}
		$('#code_bg').show();
	});
	$('#tool_code').mouseover(function(){
		var o = {top: $('#tool_code').offset().top - 25, left: $('#tool_code').offset().left - 22, width: '5em'};
		$('.tooltip').css(o);
		$('.tooltip_inner').text('插入代码');
		$('.tooltip').show();
	});
	$('#tool_code').mouseout(function(){
		$('.tooltip').css({width: 'auto'})
		$('.tooltip').hide();
	});
	$('#code_close').click(function(){
		$('#code_bg').hide();
		$('#lang').val('c');
		$('#code_txt').val('');
	});
	$('#preview').click(function(){
		var lang = $('#lang').val();
		var code = $('#code_txt').val();
		localStorage.setItem('wx-hl-code', lang);
		if('' == code) return false;
		$('#view').attr('class', lang);
		$('#view').css('background', '');
		$('#view').text(code.replace(/\t/g, '  ').trim());
		hljs.highlightBlock(document.getElementById('view'));
		hljs.lineNumbersBlock(document.getElementById('view'));
		$('#result .hljs-ln-line, #result .hljs, #result .hljs-ln').each(function(){ 
			this.style.userSelect = $(this).css('user-select');
			this.style.textAlign = $(this).css('text-align');
			this.style.verticalAlign = $(this).css('vertical-align');
			this.style.borderCollapse = $(this).css('border-collapse');
			let borderRight = $(this).css('border-right');
			let border = $(this).css('border') || 'none';
			this.style.border = border;
			this.style.borderRight = borderRight;
			this.style.padding = $(this).css('padding');
			this.style.background = $(this).css('background');
			this.style.color = $(this).css('color'); 
			this.style.fontWeight = $(this).css('font-weight'); 
			$(this).find('[class*="hljs"]').each(function(){ 
				this.style.color = $(this).css('color'); 
				this.style.fontWeight = $(this).css('font-weight'); 
				this.style.fontStyle = $(this).css('font-style'); 
			}) 
		});
		$('#result .hljs-ln-code').each(function() {
			var html = $(this).html();
			let mat = html.match(/^ +/) || [''];
			let space = '';
			for(let i = 0; i < mat[0].length; i++) space += '&nbsp;';
			html = html.replace(/^ +/, space);
			$(this).html(html);
		})
		$('#result .hljs').each(function(){
			$(this).html($(this).html().replace(/\n/g, '<br/>'));
		});

		$('#result #view').attr('data-wx-hl-code', code.replace(/<br(\/|)>/g, '&lt;br/&gt;').replace(/\n/g, '&lt;br/&gt;'));
		$('#result #view').attr('data-wx-hl-lang', lang);
		$('#result #view').attr('data-wx-hl-style', $('#style').val());
		var view = $('#result #view')
		view.removeAttr('id');
		var codeHtml = $('#result').html().trim()
		if (editObj.cur) codeHtml = $('#result>pre').html().trim()
		view.attr('id', 'view');

		var edit = editObj.doc.body;
		edit.focus();
		var selection = editObj.win.getSelection();
		if (lastEditRange) {
			selection.removeAllRanges();
			selection.addRange(lastEditRange);
		}

		if (editObj.cur) {
			editObj.cur.html(codeHtml);
			editObj.cur = null;
		}
		else if (selection.anchorNode.nodeName != '#text') {
			var codeNode = editObj.doc.createElement('span');
			codeNode.innerHTML = codeHtml;
			
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
			var codeNode = editObj.doc.createElement('span');
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
		$('#code_bg').hide();
		$('#code_txt').val('');
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
                   ||(typeof(arg0) == 'object' && arg0.preventDefault && arg0.stopPropagation)) 
               { 
                   return arg0; 
               } 
           } 
           func = func.caller; 
       } 
       return null; 
   } 
} 