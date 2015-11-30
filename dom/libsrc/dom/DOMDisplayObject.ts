//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

module egret.dom {

    export class DOMDisplayObject extends DOMDiv {
        private _displayObject:egret.DisplayObject;

        constructor(displayObject:egret.DisplayObject, id:string) {
            super("div", id);

            this._displayObject = displayObject;
            this._overrideFunctions();
        }

        public _overrideFunctions():void {
            super._overrideFunctions();

            var self = this;

            this._displayObject._draw = function (renderContext:egret.RendererContext) {
                self._draw.call(self, renderContext);
            };
        }

        public _draw(renderContext:egret.RendererContext):void {
            var do_props = this._displayObject._DO_Props_;
            if (!do_props._visible) {
                this.hide();
                _clear(this._displayObject);
                return;
            }

            if (this._displayObject == egret.MainContext.instance.stage) {
                var length:number = egret.dom._renderDisplays.length;
                if (length > 0) {
                    for (var i:number = 0; i < length; i++) {
                        if (egret.dom._renderDisplays[i] == this._displayObject) {
                            egret.dom._clear(this._displayObject);
                        }
                        else {
                            egret.dom._renderDisplays[i]._draw(renderContext);
                        }
                    }
                    egret.dom._renderDisplays = [];
                }
                length = egret.dom._alwaysRenderDisplays.length;
                if (length > 0) {
                    for (i = 0; i < length; i++) {
                        egret.dom._alwaysRenderDisplays[i]._draw(renderContext);
                    }
                }
            }
            else if (this._displayObject.getDirty()) {

                this.setWidth(this._displayObject.width);
                this.setHeight(this._displayObject.height);

                if (this._displayObject instanceof egret.DisplayObjectContainer) {
                    this.touchChildren = (<egret.DisplayObjectContainer>this._displayObject)._touchChildren;
                }
                else {
                    this.touchChildren = false;
                }

                _renderObject(this._displayObject, this);
            }
        }
    }
}