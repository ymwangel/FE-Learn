(function(){
			operate($(".mod-sn"))
		}())

		function operate(div){
			/*展开／收起click*/
			div.find("[toogle]").on("click",function(e){
				var isActive = div.hasClass("sn-list-expand")
				if(isActive){
					div.removeClass("sn-list-expand")
					setTimeout(function () {
						div.find(".choosed-item").css("display","block")
					},500)
				}else{
					div.find(".choosed-item").css("display","none")
					div.addClass("sn-list-expand")
				}
			})
			/*多选+click*/
			div.find("[more]").on("click",function(e){
				div.addClass("sn-list-more")
			})
			/*多选列表中多选框的clik事件*/
			div.find(".list-item").on("click","input",function(e){
				var index = $(this).closest(".list-item").index()
				$(this).attr("index",index)
				var isSelected = $(this).is(':checked')
				var length = $(":checked").length
				if(length>=10){
					alert("最多选择10项")
					$("input:not(:checked)").each(function(){
						$(this).attr("disabled","disabled")
					})
				}else{
					$("input:not(:checked)").each(function(){
						$(this).removeAttr("disabled")
					})
				}
				if(isSelected){
					div.find(".choosed-item > .choosed-list").append("<li class='selected-item' index="+index+">"+$(this).attr("value")+"<span class='cancel-choosed'> X</span></li>")
				}else{
					var targetIndex = '[index='+index+']'
					div.find(".choosed-item > .choosed-list").find(targetIndex).remove()
				}
			})
			/*已选列表中X的click事件*/
			div.find(".choosed-list").delegate(".selected-item > .cancel-choosed","click",function(e){
				var index = $(this).closest(".selected-item").attr("index")
				$(this).closest(".selected-item").remove()
				var targetIndex = '[index='+index+']'
				div.find(".list-item").find(targetIndex).prop("checked",false)
			})
			/*已选列表中的确定click事件*/
			div.find(".button-operate .confirm").on("click",function (e) {
				var length = $(":checked").length
				if(length == 0){
					alert("至少选择一项")
				}else{

				}
			})
			/*已选列表中的取消click事件*/
			div.find(".button-operate .cancel").on("click",function (e) {
				$("input").each(function(){
					$(this).prop("checked",false)
				})
				div.find(".choosed-list > .selected-item").remove()
				div.removeClass("sn-list-more")
			})
		}