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
    export var _header:string = "0";

    export var _hasTransform:boolean = false;
    export var _has3d:boolean = false;
    export var _hasTransitionEnd:boolean = false;

    export function _initTrans():void {
        var tempStyle = document.createElement('div').style;
        _header = _getHeader(tempStyle);

        _hasTransform = _getTrans("transform") in tempStyle;
        _has3d = _getTrans("perspective") in tempStyle;
        _hasTransitionEnd = _getTrans("transition") in tempStyle;
    }

    /**
     * 获取当前浏览器的类型
     * @returns {string}
     */
    export function _getHeader(tempStyle):string {
        if ("transform" in tempStyle) {
            return "";
        }

        var transArr:Array<string> = ["webkit", "ms", "Moz", "O"];
        for (var i:number = 0; i < transArr.length; i++) {
            var transform:string = transArr[i] + 'Transform';
            if (transform in tempStyle)
                return transArr[i];
        }

        return "";
    }

    /**
     * 获取当前浏览器类型
     * @type {string}
     */
    export function _getTrans(type:string):string {
        if (_header == "")
            return type;

        return _header + type.charAt(0).toUpperCase() + type.substr(1);
    }
}