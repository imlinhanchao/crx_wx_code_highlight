window.onload = check;

function check(){
	if ($('#ueditor_0').length > 0) {
		init()
	} else {
		setTimeout(check, 500);
	}
}


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
				<label for="lang">Language</label> <input type="text" required id="lang" value="c">
				<label for="width">Min Width</label> <input type="number" required id="width" value="400">
				<label for="style">Style</label> 
				<select id="style">
					${styles.map(s => `<option ${s == 'atom-one-dark' ? 'selected': ''} value=${s}>${s}</option>`).join('')}
				</select>
				<button id="preview">Insert</button>
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
			$('#code_txt').val(code.replace(/<br(\/|)>/g, '\n'));	
			editObj.cur = $(sel.anchorNode).parents('pre')
		}
		else if (sel.rangeCount && sel.toString() != '') {
			var text = sel.toString()
			sel.deleteFromDocument();
			var r = sel.getRangeAt(0);
			var selFrag = r.cloneContents();
			var code = document.createElement('code');
			$(code).css({
				backgroundColor: '#d5d5d5',
				padding: '2px 5px',
				borderRadius: '4px',
				fontFamily: '"Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", monospace',
				margin: '5px'
			});
			code.innerText = text;
			r.insertNode(code);
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
		if('' == code) return false;
		var width = $('#width').val();
		$('#view').attr('class', lang);
		$('#view').css('background', '');
		$('#view').text(code.replace(/\t/g, '  ').trim());
		if('' != width) $('#view').css('min-width', width + 'px');
		hljs.highlightBlock(document.getElementById('view'));
		$('#result .hljs').each(function(){ 
			this.style.background = $(this).css('background');
			this.style.color = $(this).css('color'); 
			this.style.fontWeight = $(this).css('font-weight'); 
			$(this).find('[class*="hljs"]').each(function(){ 
				this.style.color = $(this).css('color'); 
				this.style.fontWeight = $(this).css('font-weight'); 
				this.style.fontStyle = $(this).css('font-style'); 
			}) 
		});
		$('#result .hljs').each(function(){
			$(this).html($(this).html().replace(/\n/g, '<br/>'));
		});

		$('#result #view').attr('data-wx-hl-code', code.replace(/\n/g, '<br/>'));
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