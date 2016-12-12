var ui =
    {
	sidebar:
	    {
		add: function(title,source,color)
		{
		    if (color==undefined) color = {r:255,g:163,b:35};
		    var sbDiv = document.getElementById("sidebar")
		    var newDiv = document.createElement("div")
		    
		    newDiv.innerHTML = title;
		    newDiv.classList.add("sbCategory");
		    newDiv.selectedColorR = color.r;
		    newDiv.selectedColorG = color.g;
		    newDiv.selectedColorB = color.b;
		    
		    newDiv.id = "cat"+title;
		    newDiv.addEventListener
		    (
			"click"
			,function(){ui.content.navigate(source,title,color)}
		    );
		    newDiv.addEventListener
		    (
			"mouseenter"
			, function(){ui.sidebar.highlight(newDiv)}
		    );
		    newDiv.addEventListener
		    (
			"mouseleave"
			,function(){ui.sidebar.unhighlight(newDiv)}
		    );
		    sbDiv.appendChild(newDiv);
		    itemsDiv = document.createElement("div");
		    itemsDiv.id = "items"+title;
		    itemsDiv.classList.add("sbItemList");
		    sbDiv.appendChild(itemsDiv);
		    return newDiv;
		}
		, addItem: function(parent,title,source)
		{
		    var parentDiv = document.getElementById("cat"+parent);
		    var color={r:parentDiv.selectedColorR,g:parentDiv.selectedColorG,b:parentDiv.selectedColorB};
		    var list = document.getElementById("items"+parent);
		    var newDiv = document.createElement("div");
		    newDiv.innerHTML = title;
		    newDiv.style.backgroundColor="rgb("+color.r+","+color.g+","+color.b+")";
		    newDiv.classList.add("sbItem");
		    newDiv.addEventListener
		    (
			"click"
			,function(){ui.content.navigate(source,parent,color)}
		    );
		    newDiv.addEventListener
		    (
			"mouseenter"
			, function(){ui.sidebar.highlight(newDiv)}
		    );
		    newDiv.addEventListener
		    (
			"mouseleave"
			,function(){ui.sidebar.unhighlight(newDiv)}
		    );
		    list.appendChild(newDiv);
		}
		, highlight: function(catDiv)
		{
		    var hsl = rgb2hsl(catDiv.selectedColorR,catDiv.selectedColorG,catDiv.selectedColorB);
//		    alert("hsl("+hsl[0]+","+(hsl[1]-10)+"%,"+hsl[2]+"%)");
		    catDiv.prevColor = catDiv.style.backgroundColor;
		    catDiv.style.backgroundColor = "hsl("+hsl[0]+","+(hsl[1]*0.5)+"%,"+hsl[2]+"%)";
		}
		, unhighlight: function(catDiv)
		{
		    catDiv.style.backgroundColor = catDiv.prevColor;
		}
	    }
	,content:
	{
	    navigate: function(source,title,color)
	    {
		var catDiv = document.getElementById("cat"+title);
		document.getElementById("content").innerHTML= '<object id="extContent" type="text/html" data="/'+source + '" ></object>';
		var cats=document.getElementsByClassName("sbCategory");
		var i=0;
		for (;i<cats.length;i++)
		{
		    console.log(cats[i].innerHTML);
		    cats[i].classList.remove("selected");

		    cats[i].style.backgroundColor="";
		}
		catDiv.classList.add("selected");
		catDiv.style.backgroundColor="rgb("+catDiv.selectedColorR+","+catDiv.selectedColorG+","+catDiv.selectedColorB+")";
		catDiv.prevColor = catDiv.style.backgroundColor;
		var lists = document.getElementsByClassName("sbItemList");
		for (i=0;i<lists.length;i++)
		{
		    lists[i].style.display="none";
		}
		document.getElementById("items"+title).style.display="block";
	    }
	}
    }

var app =
    {
	init: function()
	{
	    ui.sidebar.add("Projects","projects.html");
	    ui.sidebar.addItem("Projects","VokabelTrainer","VokabelTrainer.html");
//	    ui.sidebar.add("TestGreen","projects.html",{r:0,g:128,b:0});
	}
    }

	
function rgb2hsv () {
    var rr, gg, bb,
        r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

function rgb2hsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
}
