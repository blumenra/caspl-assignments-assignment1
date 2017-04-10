//////////////////////////////////////
// Config object with default values
//////////////////////////////////////
var RTEConfig = {
    // browser versions
    isIE:false,
    isGecko:false,
    isSafari:false,
    isKonqueror:false,
    // default lang and encoding for xhtml
    Lang: "he",
    Encoding: "utf-8",
    // is rich text available
    isRichText: false,
    // all RTEs array , where rte id is a key and
    // value is an anonymous object with toolbar property
    allRTEs: [],
    // main path
    RTEPath:'',
    // images path
    imagesPath:'',
    // css file
    cssFile:'',
    useWikiSyntax:false,
    // menus
    Menus: {
        // paragraph menu
        Paragraph:{'Paragraph &lt;p&gt;':'<p>',
                   'Heading 1 &lt;h1&gt;':'<h1>',
                   'Heading 2 &lt;h2&gt;':'<h2>',
                   'Heading 3 &lt;h3&gt;':'<h3>',
                   'Heading 4 &lt;h4&gt;':'<h4>',
                   'Address':'<address>',
                   'Formatted  &lt;pre&gt;':'<pre>'},
        // fonts menu
        Font: {'Arial':'Arial, sans-serif',
               'Times New Roman':'Times New Roman, Times, serif',
               'Courier':'Courier New, Courier, monospace',
               'Georgia':'georgia',
               'Verdana':'Verdana',
               'Trebuchet':'trebuchet ms'},
        // sizes menu
        Size: {'small':'2','normal':'3','big':'5','huge':'6'},
        // colors
        Color:
        [
         ["#FFFFFF","#FFCCCC","#FFCC99","#FFFF99","#FFFFCC","#99FF99","#99FFFF","#CCFFFF","#CCCCFF","#FFCCFF"],
         ["#CCCCCC","#FF6666","#FF9966","#FFFF66","#FFFF33","#66FF99","#33FFFF","#66FFFF","#9999FF","#FF99FF"],
         ["#C0C0C0","#FF0000","#FF9900","#FFCC66","#FFFF00","#33FF33","#66CCCC","#33CCFF","#6666CC","#CC66CC"],
         ["#999999","#CC0000","#FF6600","#FFCC33","#FFCC00","#33CC00","#00CCCC","#3366FF","#6633FF","#CC33CC"],
         ["#666666","#990000","#CC6600","#CC9933","#999900","#009900","#339999","#3333FF","#6600CC","#993399"],
         ["#333333","#660000","#993300","#996633","#666600","#006600","#336666","#000099","#333399","#663366"],
         ["#000000","#330000","#663300","#663333","#333300","#003300","#003333","#000066","#330099","#330033"]
         ]

    }
};

// init RTE module
RTEConfig.init = function(incPath,css) {
  //set browser vars
  var ua = navigator.userAgent.toLowerCase();
  if((ua.indexOf("msie") != -1) && (ua.indexOf("opera") == -1) && (ua.indexOf("webtv") == -1)){
    this.isIE = true;
  }
  else if(ua.indexOf("gecko") != -1){
    this.isGecko = true;
  }
  else if(ua.indexOf("safari") != -1){
    this.isSafari = true;
  }
  else if(ua.indexOf("konqueror") != -1){
    this.isKonqueror = true;
  }

  //check to see if designMode mode is available
  //Safari/Konqueror think they are designMode capable even though they are not
  if (document.getElementById && document.designMode && !this.isSafari && !this.isKonqueror) {
    this.isRichText = true;
  }

  if (this.isIE) {
    document.onmouseover = raiseButton;
    document.onmouseout  = normalButton;
    document.onmousedown = lowerButton;
    document.onmouseup   = raiseButton;
  }

  //set paths vars
  this.RTEPath = incPath+'/';
  this.ImagesPath = this.RTEPath+'images/';
  this.CSSFile = css || this.RTEPath+'rte.css';

  if(this.isRichText)
      document.writeln('<style type="text/css">@import "'+this.RTEPath+'rte.css";</style>');
}

// add RTE and its properties
RTEConfig.addRTE = function(rte,props){
    this.allRTEs[rte] = props;
}
// remove RTE
RTEConfig.removeRTE = function(rte){
    delete this.allRTEs[rte];
}
// get RTE properties
RTEConfig.getRTEProperties = function(rte){
    return this.allRTEs[rte];
}
// hide all RTEs
RTEConfig.hideRTEs = function(){
    for(var k in this.allRTEs){
        showHideElement('cp'+k,'hide');
    }
}
///////////////////////////////////////////////////////
// RTE toolbar functionallity
//////////////////////////////////////////////////////
function RTEToolbar(rte){
    this.rte = rte;
}
RTEToolbar.prototype.getToolbar = function(){
    var toolbar = ['normal','Normal text',"rteCommand('"+this.rte+"','removeformat','')",
                   'bold','Bold text',"rteCommand('"+this.rte+"','bold','')",
                   'italic','Italic text',"rteCommand('"+this.rte+"','italic','')",
                   'underline','Underline text',"rteCommand('"+this.rte+"','underline','')",
                   'strikethrough','Strike through',"rteCommand('"+this.rte+"','strikethrough','')",
                   'sub','Subscript',"rteCommand('"+this.rte+"','subscript','')",
                   'sup','Supperscript',"rteCommand('"+this.rte+"','superscript','')",
                   'separator',
                   
                   'paragraph','Paragraph',"toggle_menu('"+this.getParagraphsMenuId()+"',this)",
                   'font','Fonts',"toggle_menu('"+this.getFontsMenuId()+"',this)",
                   'size','Size',"toggle_menu('"+this.getSizesMenuId()+"',this)",
                   'hr','Horizontal Rule',"rteCommand('"+this.rte+"','inserthorizontalrule','')",
                   'quote','Quote text',"quoteText('"+this.rte+"')",
                   'separator',
                   
                   'left_just','Align left',"rteCommand('"+this.rte+"','justifyleft','')",
                   'centre','Align center',"rteCommand('"+this.rte+"','justifycenter','')",
                   'right_just','Align right',"rteCommand('"+this.rte+"','justifyright','')",
                   'justifyfull','Justify full',"rteCommand('"+this.rte+"','justifyfull','')",
                   'separator',
                   
                   
                   'list','Unordered list',"rteCommand('"+this.rte+"','insertunorderedlist','')",
                   'numbered_list','Ordered list',"rteCommand('"+this.rte+"','insertorderedlist','')",
                   'outdent','Decrease indent',"rteCommand('"+this.rte+"','outdent','')",
                   'indent','Increase indent',"rteCommand('"+this.rte+"','indent','')",
                   'separator',
                   
                   'hyperlink','Hyper link',"toggle_menu('"+this.getLinkMenuId()+"',this)",
                   'image','Insert image',"toggle_menu('"+this.getImageMenuId()+"',this)",
                   'separator',
                   
                   'textcolor','Foreground',"toggle_menu('"+this.getForegroundMenuId()+"',this)",
                   'bgcolor','Background',"toggle_menu('"+this.getBackgroundMenuId()+"',this)",
                   'insert_table','Insert table',"toggle_menu('"+this.getTableMenuId()+"',this)",
                   'separator',

                   // 'cut','Cut',"rteCommand('"+rte+"','cut','')",
                   // 'copy','Copy',"rteCommand('"+rte+"','copy','')",
                   // 'paste','Paste',"rteCommand('"+rte+"','paste','')",
                   // 'separator',
                   
                   'undo','Undo',"rteCommand('"+this.rte+"','undo','')",
                   'redo','Redo',"rteCommand('"+this.rte+"','redo','')"
    ];
    
    var text = '';
    text += this.getParagraphsMenu();
    text += this.getFontsMenu();
    text += this.getSizesMenu();
    text += this.getColorChooserMenu('background');
    text += this.getColorChooserMenu('foreground');
    text += this.getLinkMenu();
    text += this.getImageMenu();
    text += this.getTableMenu();
    
    text += '<table class="rteToolbar" cellpadding="0" cellspacing="0" id="toolbar_'+this.rte+'">';
    text += '<tr>';
    for(var i=0;i<toolbar.length;i++){
      if(toolbar[i] == 'separator'){
        text += '<td><img class="rteVerticalSeparator" src="'+RTEConfig.ImagesPath+'blackdot.gif" width="1" height="20" border="0" alt=""></td>'
        continue;
      }
      var img = toolbar[i];
      var alt = toolbar[++i];
      var onclick = toolbar[++i];
      text +=
        '<td><img class="rteImage" src="'+RTEConfig.ImagesPath+img+'.gif" '+
        'alt="'+alt+'" title="'+alt+'" onclick="'+onclick+'"></td>';
    }
    
    text += '<td width="100%"></td>';
    text += '</tr>';
    text += '</table>';

    return text;
}
// paragraphs menu
RTEToolbar.prototype.getParagraphsMenuId = function(){
    return 'paragraphs_menu_'+this.rte;
}
RTEToolbar.prototype.getParagraphsMenu = function(){
    var menu_id = this.getParagraphsMenuId();
    var text = '<div class="rteMenu" id="'+menu_id+'" onmouseout="timer_hide_menu(this.id)">';
    for(var k in RTEConfig.Menus.Paragraph){
        text +=
            '<a href="javascript:void(0)"'+
            ' onclick="rteCommand(\''+this.rte+'\',\'formatblock\',\''+RTEConfig.Menus.Paragraph[k]+'\');'+
            'toggle_menu(\''+menu_id+'\',this);"'+
            ' onmouseover="clear_hide_timer()"'+
            ' onmouseout="timer_hide_menu(\''+menu_id+'\')">'+k+'</a>';
    }
    text += '</div>';
    return text;
}
// fonts menu
RTEToolbar.prototype.getFontsMenuId = function(){
    return 'fonts_menu_'+this.rte;
}
RTEToolbar.prototype.getFontsMenu = function(){
    var menu_id = this.getFontsMenuId();
    var text = '<div class="rteMenu" id="'+menu_id+'" onmouseout="timer_hide_menu(this.id)">';
    for(var k in RTEConfig.Menus.Font){
        text += '<a href="javascript:void(0)"'+
            'onclick="rteCommand(\''+this.rte+'\',\'fontname\',\''+RTEConfig.Menus.Font[k]+'\');'+
            'toggle_menu(\''+menu_id+'\',this);"'+
            ' onmouseover="clear_hide_timer()"'+
            ' onmouseout="timer_hide_menu(\''+menu_id+'\')"'+
            ' style="font-family: '+RTEConfig.Menus.Font[k]+'">'+k+'</a>';
    }
    text += '</div>';
    return text;
}
// sizes menu
RTEToolbar.prototype.getSizesMenuId = function(){
    return 'sizes_menu_'+this.rte;
}
RTEToolbar.prototype.getSizesMenu = function(){
    var menu_id = this.getSizesMenuId();
    var text = '<div class="rteMenu" id="'+menu_id+'" onmouseout="timer_hide_menu(this.id)">';
    for(var k in RTEConfig.Menus.Size){
        text += '<a href="javascript:void(0)"'+
            ' onclick="rteCommand(\''+this.rte+'\',\'fontsize\',\''+RTEConfig.Menus.Size[k]+'\');'+
            'toggle_menu(\''+menu_id+'\',this);"'+
            ' onmouseover="clear_hide_timer()"'+
            ' onmouseout="timer_hide_menu(\''+menu_id+'\')">'+
            '<font size="'+RTEConfig.Menus.Size[k]+'">'+k+'</font></a>';
    }
    text += '</div>';
    return text;
}
// color chooser menu
RTEToolbar.prototype.getBackgroundMenuId = function(){
    return 'background_menu_'+this.rte;
}
RTEToolbar.prototype.getForegroundMenuId = function(){
    return 'foreground_menu_'+this.rte;
}
// mod can be 'background' or 'foreground'
RTEToolbar.prototype.getColorChooserMenu = function(mode){
    var menu_id = mode=='background'?this.getBackgroundMenuId():this.getForegroundMenuId();
    var action = mode=='background'?'hilitecolor':'forecolor';
    var text = '<div class="rteColorChooser" id="'+menu_id+'" onmouseout="timer_hide_menu(this.id)">';
    text += '<table cellspacing="0" cellpadding="0">';
    for(var i=0;i<RTEConfig.Menus.Color.length;i++){
        text += '<tr>';
        for(var j=0;j<RTEConfig.Menus.Color[i].length;j++){
            var c = RTEConfig.Menus.Color[i][j];
            text +=
                '<td style="background-color:'+c+'">'+
                '<a href="javascript:void(0)"'+
                ' title="'+c+'"'+
                ' onclick="rteCommand(\''+this.rte+'\',\''+action+'\',\''+c+'\');'+
                'toggle_menu(\''+menu_id+'\',this);"'+
                ' onmouseover="clear_hide_timer()"'+
                ' onmouseout="timer_hide_menu(\''+menu_id+'\')">'+
                '</a>'+
                '</td>';
        }
        text += '</tr>';
    }
    text += '</table>';
    text += '</div>';
    return text;
}
// link menu
RTEToolbar.prototype.getLinkMenuId = function(){
    return 'link_'+this.rte;
}
RTEToolbar.prototype.getLinkMenu = function(){
    var menu_id = this.getLinkMenuId();
    var href_id = 'href_'+this.getLinkMenuId();
    var text = '<div class="rteMenuForm" id="'+menu_id+'">';
    text += '<b>URL:</b> <input type="text" id="'+href_id+'" size="45" value="http://"/><br/>';
    text += '<input type="button" value=" add "'+
    ' onclick="if(insertLink(\''+this.rte+'\',document.getElementById(\''+href_id+'\').value))'+
    '{hide_menu(\''+menu_id+'\',this);}""/>';
    text += '&nbsp;';
    text += '<input type="button" value="close" onclick="hide_menu(\''+menu_id+'\');""/>';
    text += '</div>';
    return text;
}
// image menu
RTEToolbar.prototype.getImageMenuId = function(){
    return 'image_'+this.rte;
}
RTEToolbar.prototype.getImageMenu = function(){
    var menu_id = this.getImageMenuId();
    var src_id = 'src_'+this.getLinkMenuId();
    var text = '<div class="rteMenuForm" id="'+menu_id+'">';
    text += '<b>Image URL:</b> <input type="text" id="'+src_id+'" size="45" value="http://"/><br/>';
    text += '<input type="button" value=" add "'+
    ' onclick="if(insertImage(\''+this.rte+'\',document.getElementById(\''+src_id+'\').value))'+
    '{hide_menu(\''+menu_id+'\',this);}""/>';
    text += '&nbsp;';
    text += '<input type="button" value="close" onclick="hide_menu(\''+menu_id+'\');""/>';
    text += '</div>';
    return text;
}
// table menu
RTEToolbar.prototype.getTableMenuId = function(){
    return 'table_'+this.rte;
}
RTEToolbar.prototype.getTableMenu = function(){
    var menu_id = this.getTableMenuId();
    var rows_id = 'rows_'+this.getLinkMenuId();
    var cols_id = 'cols_'+this.getLinkMenuId();
    var width_id = 'width_'+this.getLinkMenuId();
    var border_id = 'border_'+this.getLinkMenuId();
    var padding_id = 'padding_'+this.getLinkMenuId();
    var spacing_id = 'spacing_'+this.getLinkMenuId();
    
    var text = '<div class="rteMenuForm" id="'+menu_id+'">';
    text += '<table>';
    text += '<tr>';
    text += '<td>Rows:</td><td><input type="text" id="'+rows_id+'" size="3" value="3"/></td>';
    text += '<td>Columns:</td><td><input type="text" id="'+cols_id+'" size="3" value="3"/></td>';
    text += '</tr>';
    text += '<tr>';
    text += '<td>Width:</td><td><input type="text" id="'+width_id+'" size="4" value="100%"/></td>';
    text += '<td>Border:</td><td><input type="text" id="'+border_id+'" size="2" value="1"/></td>';
    text += '</tr>';
    text += '<tr><td colspan="4">';
    text += '<input type="button" value=" add "'+
    ' onclick="if(insertTable(\''+this.rte+'\','+
      'document.getElementById(\''+rows_id+'\').value,'+
      'document.getElementById(\''+cols_id+'\').value,'+
      'document.getElementById(\''+width_id+'\').value,'+
      'document.getElementById(\''+border_id+'\').value,'+
    'false,false))'+
    '{hide_menu(\''+menu_id+'\',this);}""/>';
    text += '&nbsp;';
    text += '<input type="button" value="close" onclick="hide_menu(\''+menu_id+'\');""/>';
    text += '</td></tr>';
    text += '</table>';
    
    text += '</div>';
    return text;
}


///////////////////////////////////////////////////////
// enable RTE on some 'papa' element
///////////////////////////////////////////////////////
function enableRichText(papa,html,width,height) {
  papa = document.getElementById(papa);
  if(!papa) return false;
  
  width = width || '100%';
  height = height || 200;
  // uniq rte id
  var rte = 'rte_'+Math.floor(Math.random()*100000000);
  var div = document.createElement('div');
  papa.appendChild(div);
  if (RTEConfig.isRichText) {
    // rte toolbar
    var rte_toolbar = new RTEToolbar(rte);
    
    RTEConfig.addRTE(rte,{toolbar: rte_toolbar});
    
    div.id = "div_"+rte;
    div.className = "rteDiv";

    var text = rte_toolbar.getToolbar();

    text += "\n";
    text += '<iframe id="'+rte+'" name="'+rte+'" width="'+width+'px" height="'+height+'px" src="'+RTEConfig.RTEPath+'blank.html"></iframe>';
    
    text += "\n<br/>\n";
    text += '<input type="checkbox" id="chkSrc'+rte+'" onclick="toggleHTMLSrc(\''+rte+'\','+true+');"/>';
    text += '&nbsp;<label for="chkSrc'+rte+'">HTML source</label>';
    text += "\n";
        
    div.innerHTML = text;

    enableDesignMode(rte, html, false);
  }
  else{
    div.innerHTML = '<textarea name="'+rte+'" id="'+rte+'" style="width: '+width+'px; height: '+height+'px;">'+html+'</textarea>';
  }
  return rte;
}

// getting RTE window object by id
function getRteObject(rte){
    if (RTEConfig.isIE)
        return frames[rte];
    else
        return document.getElementById(rte).contentWindow;
}
//
function getRteObjectDocument(rte){
    if (RTEConfig.isIE)
        return frames[rte].document;
    else
        return document.getElementById(rte).contentWindow.document;
}


// turn off some RTE
function disableRichText(rte){
  var rte_div = document.getElementById("div_"+rte);
  rte_div.parentNode.removeChild(rte_div);
  RTEConfig.removeRTE(rte);
}

// enable some RTE
function enableDesignMode(rte, html, readOnly) {
  var frameHtml = "<html id=\""+rte+"\">\n";
  frameHtml += "<head>\n";
  frameHtml += "<link media=\"all\" type=\"text/css\" href=\""+RTEConfig.CSSFile+"\" rel=\"stylesheet\">\n";
  frameHtml += "</head>\n";
  frameHtml += "<body>\n";
  frameHtml += html+"\n";
  frameHtml += "</body>\n";
  frameHtml += "</html>";

  if (RTEConfig.isIE) {
    var oRTE = frames[rte].document;
    oRTE.open();
    oRTE.write(frameHtml);
    oRTE.close();
    if (!readOnly) {
      oRTE.designMode = "On";
      oRTE.attachEvent("onkeypress", function evt_ie_keypress(event) {ieKeyPress(event, rte);});
    }
  }
  else {
    try {
      if (!readOnly){
          document.getElementById(rte).contentDocument.designMode = "on";
      }
      try{
        var oRTE = document.getElementById(rte).contentWindow.document;
        oRTE.open();
        oRTE.write(frameHtml);
        oRTE.close();
        if (RTEConfig.isGecko && !readOnly) {
          //attach a keyboard handler for gecko browsers to make keyboard shortcuts work
            oRTE.addEventListener("keypress", geckoKeyPress, true);
        }
      }
      catch(e){
          alert("Error preloading content.");
      }
    }
    catch(e){
        //gecko may take some time to enable design mode.
        //Keep looping until able to set.
        if(RTEConfig.isGecko) {
            setTimeout("enableDesignMode('"+rte+"', '"+html+"', "+readOnly+");", 10);
        }
        else{
            return false;
        }
    }
  }
}
//////////////////////////////////
// get source from some RTE
//////////////////////////////////
function getRteSource(rte,mode){
    try{
        var ret = '';
        var body = getRteObject(rte).document.body;
        
        if(mode == 'text'){
            ret = html2text(body);
        }
        else if(mode == 'raw'){
            ret = body.innerHTML;
        }
        else if(mode == 'wiki' || mode == 'cswml'){
            ret = convertToCSWML(body.innerHTML);
        }
        else{
            ret = get_xhtml(body, RTEConfig.Lang, RTEConfig.Encoding);
        }
        //if there is no content (other than formatting) set value to nothing
        if(mode != 'text' && stripHTML(ret.replace("&nbsp;", " ")) == "" &&
           ret.toLowerCase().search("<hr") == -1 &&
           ret.toLowerCase().search("<img") == -1) ret = "";
        return ret;
    }catch(e){
        alert("Error:"+e);
        return e.toString();
    }
}
///////////////////////////////
// execute some RTE command
///////////////////////////////
function rteCommand(rte, command, option) {
  // IE hack
  if(RTEConfig.isIE && command == "hilitecolor"){
    command = "backcolor";
  }

  // special cases
  if(command == 'bold'){
      rteInsertTags(rte,'<b>','</b>');
  }
  else if(command == 'italic'){
      rteInsertTags(rte,'<i>','</i>');
  }
  else if(command == 'underline'){
      rteInsertTags(rte,'<u>','</u>');
  }
  else if(command == 'strikethrough'){
      rteInsertTags(rte,'<s>','</s>');
  }
  else if(command == 'sub'){
      rteInsertTags(rte,'<sub>','</sub>');
  }
  else if(command == 'sup'){
      rteInsertTags(rte,'<sup>','</sup>');
  }
  else{
    // function to perform command
    try {
        var oRTE = getRteObject(rte);
        oRTE.focus();
        oRTE.document.execCommand(command, false, option);
        oRTE.focus();
    } catch (e) {
        //		alert(e);
        //		setTimeout("rteCommand('"+rte+"', '"+command+"', '"+option+"');", 10);
    }
  }
}
///////////////////////////////////////////////
// insert tag before and after selected range
// returns false in unsuccess (no range)
//////////////////////////////////////////////
function rteInsertTags(rte,start,end){
  var rng = setRange(rte);
  var text='';
  if(RTEConfig.isIE) {
    text = rng.htmlText;
  }
  else{
    text = rng.toString();
    // text = rng.cloneContents(); //get dom object
  }
  if(text == '')
      return false;
  rteInsertHTML(rte,start+text+end);
  return true;
}
//function to store range of current selection 
function setRange(rte) {
  var oRTE = getRteObject(rte);
  if (RTEConfig.isIE) {
    var selection = oRTE.document.selection; 
    if (selection != null) rng = selection.createRange();
  } else {
    var selection = oRTE.getSelection();
    rng = selection.getRangeAt(selection.rangeCount - 1).cloneRange();
  }
  return rng;
}

//////////////////////////////
// insert html code into RTE
///////////////////////////////
function rteInsertHTML(rte,html) {
  var oRTE = getRteObject(rte);

  oRTE.focus();
  if (RTEConfig.isIE) {
    var oRng = oRTE.document.selection.createRange();
    oRng.pasteHTML(html);
    oRng.collapse(false);
    oRng.select();
  }
  else {
    oRTE.document.execCommand('insertHTML', false, html);
  }
}
//////////////////////////////
// Various design functions
//////////////////////////////

// insert quoted text block
function quoteText(rte){
  rteInsertTags(rte,
                '<br/><blockquote style="margin:6px 0px 6px 6px;padding:4px;border-left:1px solid #888888;">',
                '</blockquote>');
}
// insert link
function insertLink(rte,href){
    if(href == '' || href.match(/^https?:\/\/$/)){
        alert(href+' is not valid URL');
        return false;
    }
    else if(rteInsertTags(rte,'<a href="'+href+'">','</a>')){
        return true;
    }
    else{
        alert('Select some text');
        return false;
    }
}
// insert image
function insertImage(rte,src){
    if(src == '' || src.match(/^https?:\/\/$/)){
        alert(src+' is not valid URL');
        return false;
    }
    else{
        rteCommand(rte,'InsertImage',src);
        return true;
    }
}
// insert table
function insertTable(rte,rows,cols,width,border,padding,spacing){
	var html = '<table';
    if(width) html += ' width="'+width+'"';
    if(border) html += ' border="'+border+'"';
    if(padding) html += ' cellpadding="'+padding+'"';
    if(spacing) html += ' cellspacing="'+spacing+'"';
    html += '">\n';
    
	for(var i=0;i<rows;i++) {
		html += "<tr>\n";
		for (var j=0;j<cols;j++) {
			html += "<td>&nbsp;</td>\n";
		}
		html+= "\n</tr>\n";
	}
	html += "</table>\n";
    
	rteInsertHTML(rte,html);
    return true;
}


// toggle HTML source
function toggleHTMLSrc(rte, buttons) {
  var oRTE = getRteObject(rte).document;
  if (document.getElementById("chkSrc"+rte).checked) {
    //we are checking the box
    if (buttons) {
      showHideElement("toolbar_"+rte, "hide");
    }
    if (RTEConfig.isIE) {
      oRTE.body.innerText = getRteSource(rte);
    }
    else {
      var htmlTxt = oRTE.createTextNode(getRteSource(rte));
      oRTE.body.innerHTML = "";
      oRTE.body.style.whiteSpace = 'pre';
      oRTE.body.appendChild(htmlTxt);
    }
  }
  else {
    //we are unchecking the box
    if (buttons) {
      showHideElement("toolbar_"+rte, "show");
    }
    if (RTEConfig.isIE) {
      //fix for IE
      var output = escape(frames[rte].document.body.innerText);
      output = output.replace("%3CP%3E%0D%0A%3CHR%3E", "%3CHR%3E");
      output = output.replace("%3CHR%3E%0D%0A%3C/P%3E", "%3CHR%3E");
      oRTE.body.innerHTML = unescape(output);
    }
    else {
      var htmlSrc = oRTE.body.ownerDocument.createRange();
      htmlSrc.selectNodeContents(oRTE.body);
      oRTE.body.innerHTML = htmlSrc.toString();
      oRTE.body.style.whiteSpace = 'normal';
    }
  }
}

//////////////////////////////////////////////////
// menu functions
//////////////////////////////////////////////////
function hide_menu(menu_id){
    var menu = document.getElementById(menu_id);
    if(!menu) return;
    menu.style.visibility = 'hidden';
}
function show_menu(menu_id,papa){
    var menu = document.getElementById(menu_id);
    if(!menu || !papa) return;
    menu.style.left = (getOffsetLeft(papa)+3)+"px";
    menu.style.top = (getOffsetTop(papa)+17)+"px";
    menu.style.visibility = 'visible';
}

function toggle_menu(menu_id,papa){
  var menu = document.getElementById(menu_id);
  if(!menu) return;
  if(menu.style.visibility == '' || menu.style.visibility == "hidden") {
      show_menu(menu_id,papa);
  }
  else{
      hide_menu(menu_id);
  }
}

var hidetimer = null;
function clear_hide_timer(){
  if(hidetimer) clearTimeout(hidetimer);
  hidetimer = null;
}
function timer_hide_menu(menu_id){
  clear_hide_timer();
  hidetimer = setTimeout("hide_menu('"+menu_id+"');",500);
}

function getOffsetTop(elm) {
  var mOffsetTop = elm.offsetTop;
  var mOffsetParent = elm.offsetParent;
  var parents_up = 2; //the positioning div is 2 elements up the tree

  while(parents_up > 0) {
    mOffsetTop += mOffsetParent.offsetTop;
    mOffsetParent = mOffsetParent.offsetParent;
    parents_up--;
  }

  return mOffsetTop;
}

function getOffsetLeft(elm) {
  var mOffsetLeft = elm.offsetLeft;
  var mOffsetParent = elm.offsetParent;
  var parents_up = 2;

  while(parents_up > 0) {
    mOffsetLeft += mOffsetParent.offsetLeft;
    mOffsetParent = mOffsetParent.offsetParent;
    parents_up--;
  }

  return mOffsetLeft;
}


// show/hide some element
function showHideElement(element, showHide) {
  //function to show or hide elements
  //element variable can be string or object
  if (document.getElementById(element)) {
    element = document.getElementById(element);
  }

  if (showHide == "show") {
    element.style.visibility = "visible";
  } else if (showHide == "hide") {
    element.style.visibility = "hidden";
  }
}
// strip HTML tags
function stripHTML(oldString) {
  //function to strip all html
  var newString = oldString.replace(/(<([^>]+)>)/ig,"");

  //replace carriage returns and line feeds
  newString = newString.replace(/\r\n/g," ");
  newString = newString.replace(/\n/g," ");
  newString = newString.replace(/\r/g," ");

  //trim string
  newString = trim(newString);

  return newString;
}

function trim(inputString) {
  // Removes leading and trailing spaces from the passed string. Also removes
  // consecutive spaces and replaces it with one space. If something besides
  // a string is passed in (null, custom object, etc.) then return the input.
  if (typeof inputString != "string") return inputString;
  var retValue = inputString;
  var ch = retValue.substring(0, 1);

  while (ch == " ") { // Check for spaces at the beginning of the string
    retValue = retValue.substring(1, retValue.length);
    ch = retValue.substring(0, 1);
  }
  ch = retValue.substring(retValue.length - 1, retValue.length);

  while (ch == " ") { // Check for spaces at the end of the string
    retValue = retValue.substring(0, retValue.length - 1);
    ch = retValue.substring(retValue.length - 1, retValue.length);
  }

  // Note that there are two spaces in the string - look for multiple spaces within the string
  while (retValue.indexOf("  ") != -1) {
    // Again, there are two spaces in each of the strings
    retValue = retValue.substring(0, retValue.indexOf("  "))+retValue.substring(retValue.indexOf("  ")+1, retValue.length);
  }
  return retValue; // Return the trimmed string back to the user
}

///////////////////////////
//Gecko-Only Functions
///////////////////////////
function geckoKeyPress(evt) {
  //function to add bold, italic, and underline shortcut commands to gecko RTEs
  //contributed by Anti Veeranna (thanks Anti!)
  var rte = evt.target.id;

  if (evt.ctrlKey) {
    var key = String.fromCharCode(evt.charCode).toLowerCase();
    var cmd = '';
    switch (key) {
    case 'b': cmd = "bold"; break;
    case 'i': cmd = "italic"; break;
    case 'u': cmd = "underline"; break;
    };

    if (cmd) {
      rteCommand(rte, cmd, null);

      // stop the event bubble
      evt.preventDefault();
      evt.stopPropagation();
    }
  }
}

//////////////////////
//IE-Only Functions
//////////////////////
function ieKeyPress(evt, rte) {
  var key = (evt.which || evt.charCode || evt.keyCode);
  var stringKey = String.fromCharCode(key).toLowerCase();

  //the following breaks list and indentation functionality in IE (don't use)
  switch (key) {
  case 13:
      //insert <br> tag instead of <p>
      //change the key pressed to null
      evt.keyCode = 0;
      //insert <br> tag
      rteInsertHTML(rte,'<br/>');
      break;
  }
}

function checkspell() {
  //function to perform spell check
  try {
    var tmpis = new ActiveXObject("ieSpell.ieSpellExtension");
    tmpis.CheckAllLinkedDocuments(document);
  }
  catch(exception) {
    if(exception.number==-2146827859) {
      if (confirm("ieSpell not detected.  Click Ok to go to download page."))
        window.open("http://www.iespell.com/download.php","DownLoad");
    } else {
      alert("Error Loading ieSpell: Exception "+exception.number);
    }
  }
}

function raiseButton(e) {
  var el = window.event.srcElement;

  className = el.className;
  if (className == 'rteImage' || className == 'rteImageLowered') {
    el.className = 'rteImageRaised';
  }
}

function normalButton(e) {
  var el = window.event.srcElement;

  className = el.className;
  if (className == 'rteImageRaised' || className == 'rteImageLowered') {
    el.className = 'rteImage';
  }
}

function lowerButton(e) {
  var el = window.event.srcElement;

  className = el.className;
  if (className == 'rteImage' || className == 'rteImageRaised') {
    el.className = 'rteImageLowered';
  }
}


///////////////////////////////////////////////////
// convert to CSWML
///////////////////////////////////////////////////
function convertToCSWML(html){
    var text = html;
    if(RTEConfig.useWikiSyntax)
      alert(html);
    text = text.replace(/<blockquote[^>]*>(.+)<\/blockquote>/g, "[@ $1 @]");
    text = text.replace(/<a [^>]*wiki="wikilink:([^\"]+)"[^>]*>(.+)<\/a>/g, "[[$2|$1]]");
  // text = text.replace(/<div class=['"]ljcut['"] text=['"](.+?)['"]>(.+?)<\/div>/g, '<lj-cut text="$1">$2</lj-cut>');
  // text = text.replace(/<div text=['"](.+?)['"] class=['"]ljcut['"]>(.+?)<\/div>/g, '<lj-cut text="$1">$2</lj-cut>');
  // text = text.replace(/<div class=['"]ljcut['"]>(.+?)<\/div>/g, '<lj-cut>$1</lj-cut>');
  // text = text.replace(/<div class=['"]ljuser['"]>.+?<b>(\w+?)<\/b><\/a><\/div>/g, '<lj user=\"$1\">');
  // text = text.replace(/<div class=['"]ljvideo['"] url=['"](\S+)['"]><img.+?\/><\/div>/g, '<lj-template name=\"video\">$1</lj-template>');
  // text = text.replace(/<div class=['"]ljvideo['"] url=['"](\S+)['"]><br \/><\/div>/g, '');
  // text = text.replace(/<div class=['"]ljraw['"]>(.+?)<\/div>/g, '<lj-raw>$1</lj-raw>');

  // text = text.replace(/<br[ ]*[\/]?>/g,"\n");
  
    text = text.replace(/<p>(.*?)<\/p>/g,"$1\n");
    text = text.replace(/&nbsp;/g," ");
    
    return text;
}
