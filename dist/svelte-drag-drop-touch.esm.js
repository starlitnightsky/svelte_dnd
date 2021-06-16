var t;!function(e){var n=function(){function t(){this._dropEffect="move",this._effectAllowed="all",this._data={}}return Object.defineProperty(t.prototype,"dropEffect",{enumerable:!0,configurable:!0,get:function(){return this._dropEffect},set:function(t){this._dropEffect=t}}),Object.defineProperty(t.prototype,"effectAllowed",{enumerable:!0,configurable:!0,get:function(){return this._effectAllowed},set:function(t){this._effectAllowed=t}}),Object.defineProperty(t.prototype,"types",{enumerable:!0,configurable:!0,get:function(){return Object.keys(this._data)}}),t.prototype.clearData=function(t){null==t?this._data={}:delete this._data[t.toLowerCase()]},t.prototype.getData=function(t){return this._data[t.toLowerCase()]||""},t.prototype.setData=function(t,e){this._data[t.toLowerCase()]=e},t.prototype.setDragImage=function(t,e,n){var o=i._instance;o._imgCustom=t,o._imgOffset={x:e,y:n}},t}();e.DataTransfer=n;var i=function(){function t(){if(this._lastClick=0,null!=i&&null!=i._instance)throw new Error("DragDropTouch instance already created.");var t=!1;if(document.addEventListener("test",(function(){}),{get passive(){return t=!0,!0}}),navigator.maxTouchPoints>0){var e=this._touchstart.bind(this),n=this._touchmove.bind(this),o=this._touchend.bind(this),s=!!t&&{passive:!1,capture:!1};document.addEventListener("touchstart",e,s),document.addEventListener("touchmove",n,s),document.addEventListener("touchend",o),document.addEventListener("touchcancel",o)}}t.getInstance=function(){return i._instance},t.prototype._touchstart=function(t){var e=this;if(this._shouldHandle(t)){if(Date.now()-this._lastClick<i._DBLCLICK&&this._dispatchEvent(t,"dblclick",t.target))return t.preventDefault(),void this._reset();this._reset();var n=this._closestDraggable(t.target);null!=n&&(this._dispatchEvent(t,"mousemove",t.target)||this._dispatchEvent(t,"mousedown",t.target)||(this._dragSource=n,this._ptDown=this._getPoint(t),this._lastTouch=t,t.preventDefault(),setTimeout((function(){e._dragSource===n&&null==e._img&&e._dispatchEvent(t,"contextmenu",n)&&e._reset()}),i._CTXMENU),i._ISPRESSHOLDMODE&&(this._pressHoldInterval=setTimeout((function(){e._isDragEnabled=!0,e._touchmove(t)}),i._PRESSHOLDAWAIT))))}},t.prototype._touchmove=function(t){if(this._shouldCancelPressHoldMove(t))this._reset();else if(this._shouldHandleMove(t)||this._shouldHandlePressHoldMove(t)){var e=this._getTarget(t);if(this._dispatchEvent(t,"mousemove",e))return this._lastTouch=t,void t.preventDefault();var n=this._getPoint(this._lastTouch,!0),i=this._getPoint(t,!0);this._lastMovementX=i.x-n.x,this._lastMovementY=i.y-n.y;var o={movementX:this._lastMovementX,movementY:this._lastMovementY};this._dragSource&&null==this._img&&this._shouldStartDragging(t)&&(this._dispatchEvent(t,"dragstart",this._dragSource,o),this._createImage(t),this._dispatchEvent(t,"dragenter",e,o)),null!=this._img&&(this._lastTouch=t,t.preventDefault(),this._dispatchEvent(t,"drag",this._dragSource,o),e!=this._lastTarget&&(this._dispatchEvent(this._lastTouch,"dragleave",this._lastTarget,o),this._dispatchEvent(t,"dragenter",e,o),this._lastTarget=e),this._moveImage(t),this._isDropZone=this._dispatchEvent(t,"dragover",e,o))}},t.prototype._touchend=function(t){if(this._shouldHandle(t)){if(this._dispatchEvent(this._lastTouch,"mouseup",t.target))return void t.preventDefault();if(null==this._img&&(this._dragSource=null,this._dispatchEvent(this._lastTouch,"click",t.target),this._lastClick=Date.now()),this._destroyImage(),this._dragSource){var e={movementX:this._lastMovementX,movementY:this._lastMovementY};t.type.indexOf("cancel")<0&&this._isDropZone&&this._dispatchEvent(this._lastTouch,"drop",this._lastTarget,e),this._dispatchEvent(this._lastTouch,"dragend",this._dragSource,e),this._reset()}}},t.prototype._shouldHandle=function(t){return null!=t&&!t.defaultPrevented&&null!=t.touches&&t.touches.length<2},t.prototype._shouldHandleMove=function(t){return!i._ISPRESSHOLDMODE&&this._shouldHandle(t)},t.prototype._shouldHandlePressHoldMove=function(t){return i._ISPRESSHOLDMODE&&this._isDragEnabled&&null!=t&&null!=t.touches&&t.touches.length>0},t.prototype._shouldCancelPressHoldMove=function(t){return i._ISPRESSHOLDMODE&&!this._isDragEnabled&&this._getDelta(t)>i._PRESSHOLDMARGIN},t.prototype._shouldStartDragging=function(t){var e=this._getDelta(t);return e>i._THRESHOLD||i._ISPRESSHOLDMODE&&e>=i._PRESSHOLDTHRESHOLD},t.prototype._reset=function(){this._destroyImage(),this._dragSource=null,this._lastTouch=null,this._lastTarget=null,this._ptDown=null,this._isDragEnabled=!1,this._isDropZone=!1,this._dataTransfer=new n,this._lastMovementX=0,this._lastMovementY=0,clearInterval(this._pressHoldInterval)},t.prototype._getPoint=function(t,e){if(null!=t&&null!=t.touches&&t.touches.length>0){var n=t.touches[0];return{x:e?n.pageX:n.clientX,y:e?n.pageY:n.clientY}}var i=t;return{x:e?i.pageX:i.clientX,y:e?i.pageY:i.clientY}},t.prototype._getDelta=function(t){if(i._ISPRESSHOLDMODE&&!this._ptDown)return 0;var e=this._getPoint(t);return Math.abs(e.x-this._ptDown.x)+Math.abs(e.y-this._ptDown.y)},t.prototype._getTarget=function(t){for(var e=this._getPoint(t),n=document.elementFromPoint(e.x,e.y);null!=n&&"none"==getComputedStyle(n).pointerEvents;)n=n.parentElement;return n},t.prototype._createImage=function(t){null!=this._img&&this._destroyImage();var e=this._imgCustom||this._dragSource;if(this._img=e.cloneNode(!0),this._copyStyle(e,this._img),this._img.style.top=this._img.style.left="-9999px",null==this._imgCustom){var n=e.getBoundingClientRect(),o=this._getPoint(t);this._imgOffset={x:o.x-n.left,y:o.y-n.top},this._img.style.opacity=i._OPACITY.toString()}this._moveImage(t),document.body.appendChild(this._img)},t.prototype._destroyImage=function(){null!=this._img&&null!=this._img.parentElement&&this._img.parentElement.removeChild(this._img),this._img=null,this._imgCustom=null},t.prototype._moveImage=function(t){var e=this;requestAnimationFrame((function(){if(null!=e._img){var n=e._getPoint(t,!0),i=e._img.style;i.position="absolute",i.pointerEvents="none",i.zIndex="999999",i.left=Math.round(n.x-e._imgOffset.x)+"px",i.top=Math.round(n.y-e._imgOffset.y)+"px"}}))},t.prototype._copyProps=function(t,e,n){for(var i=0;i<n.length;i++){var o=n[i];t[o]=e[o]}},t.prototype._copyStyle=function(t,e){if(i._rmvAtts.forEach((function(t){e.removeAttribute(t)})),t instanceof HTMLCanvasElement){var n=t,o=e;o.width=n.width,o.height=n.height,o.getContext("2d").drawImage(n,0,0)}for(var s=getComputedStyle(t),r=0;r<s.length;r++){var a=s[r];a.indexOf("transition")<0&&(e.style[a]=s[a])}for(e.style.pointerEvents="none",r=0;r<t.children.length;r++)this._copyStyle(t.children[r],e.children[r])},t.prototype._dispatchEvent=function(t,e,n,o){if(null!=t&&null!=n){var s=document.createEvent("Event"),r=null!=t.touches?t.touches[0]:t;return s.initEvent(e,!0,!0),s.button=0,s.which=s.buttons=1,this._copyProps(s,t,i._kbdProps),this._copyProps(s,r,i._ptProps),s.dataTransfer=this._dataTransfer,null!=o&&(s.movementX=o.movementX,s.movementY=o.movementY),n.dispatchEvent(s),s.defaultPrevented}return!1},t.prototype._closestDraggable=function(t){for(;t;t=t.parentElement)if(t.hasAttribute("draggable")&&t.getAttribute("draggable"))return t;return null};var e=new t;return e._instance=e,e}();e.DragDropTouch=i;var o=t.DragDropTouch;o._THRESHOLD=5,o._OPACITY=.5,o._DBLCLICK=500,o._CTXMENU=900,o._ISPRESSHOLDMODE=!1,o._PRESSHOLDAWAIT=400,o._PRESSHOLDMARGIN=25,o._PRESSHOLDTHRESHOLD=0,o._rmvAtts="id,class,style,draggable".split(","),o._kbdProps="altKey,ctrlKey,metaKey,shiftKey".split(","),o._ptProps="pageX,pageY,clientX,clientY,screenX,screenY,offsetX,offsetY".split(",")}(t||(t={}));var e=t.DragDropTouch;export default e;
//# sourceMappingURL=svelte-drag-drop-touch.esm.js.map
