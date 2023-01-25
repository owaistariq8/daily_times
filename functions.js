function customer_td(data,html_new_record)
{
    if(data.cid)
    {
        var tool_tip_html = '<a href="javascript:void(0);" class="btn btn-xs btn-info" data-toggle="popover" title="Contact Information" data-content="NTN:'+data.NTN+', Contact:'+data.contact+', Address:'+data.address+'">Contact Info</a>'
        html_new_record = html_new_record + "<td>"+data.cid+"</td><td>"+data.name+"</td><td>"+data.type+"</td><td>"+data.city+"</td><td>"+data.phone+"</td><td>"+data.comm+"</td><td>"+data.fax+"</td><td>"+data.credit_days+"</td><td class='hidden'>"+data.contact+"</td><td class='hidden'>"+data.address+"</td><td class='hidden'>"+data.NTN+"</td><td>"+tool_tip_html+"</td><td><div class='dropdown'><button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Actions<span class='caret'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0);' class='edit' data-id='"+data.cid+"'>Edit</a></li><li><a href='javascript:void(0);' class='delete' data-id='"+data.cid+"'>Delete</a></ul></div></td>";
        return html_new_record;
    }
}

function getCustomers(limit,page,mode)
{
    if(!limit)
    {
        limit = 10;
    }
    if(!page)
    {
        page = 1;
    }
    $.ajax({
        url: 'http://localhost/daily_times/ajax.php',
        type: "POST",
        data : { "mode" : "get_customers","limit" : limit , 'page' : page } ,
        dataType: "JSON",
        beforeSend: function () {
            $('.loading-holder').removeClass("hidden");
        },
        success:function (data) 
        {
            if(data)
            {
                if(data.success)
                {
                    if(data.results)
                    {
                        var html_new_record='',
                        tool_tip_html = '';
                        $("#customer-records").removeClass("hidden");
                        $.each(data.results,function(index,value){
                            html_new_record+="<tr id='"+value.cid+"'>"+customer_td(value,'')+"</tr>";
                        }); 
                        $(".customer-records").parent('.panel-box').removeClass('hidden');
                        if(mode=='html')
                        {
                            $(".customer-records").removeClass('hidden').find('tbody').html(html_new_record);
                        }
                        else
                        {
                            $(".customer-records").removeClass('hidden').find('tbody').append(html_new_record);   
                        }
                        $('[data-toggle="popover"]').popover();
                        if(data.results.length<10)
                        {
                            $('.load-more').addClass('hidden')  
                        }
                        // show_ajax_messages(data.message,'success')
                    }
                    else
                    {
                        if(data.message=='not_found')
                        {
                            $('.load-more').addClass('hidden')
                        }
                        else
                        {
                            $(".customer-records").parent('.panel-box').addClass('hidden')
                        }
                    }
                    if(data.types)
                    {
                        var type_html = '';
                        $.each(data.types,function(index,value){
                            type_html+= "<option value="+value.type+">"+value.type+"</option>" 
                        });
                        $("#type").html(type_html)
                    }
                    console.log(data)
                    // window.location.href = './home.html';
                }
                else
                {
                    show_ajax_messages(data.message,'error')
                }
            }
            else
            {
                show_ajax_messages("Something went wrong!",'error')
            }
        },
        error:function(data)
        {
            // $("#add_cust_btn").attr('disabled',false);
        },
        complete:function (data) 
        {
            $('.loading-holder').addClass("hidden");
        } 
    });
}
function client_td(data,html_new_record)
{
    if(data.cid)
    {
        var tool_tip_html = '<a href="javascript:void(0);" class="btn btn-xs btn-info" data-toggle="popover" title="Contact Information" data-content=" Contact:'+data.contact+', Address:'+data.address+'">Contact Info</a>';
        html_new_record = html_new_record+"<td>"+data.cid+"</td><td>"+data.name+"</td><td>"+data.type+"</td><td>"+data.city+"</td><td>"+data.phone+"</td><td>"+data.fax+"</td><td class='hidden'>"+data.contact+"</td><td class='hidden'>"+data.address+"</td><td>"+tool_tip_html+"</td><td><div class='dropdown'><button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Actions<span class='caret'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0);' class='edit-client' data-id='"+data.cid+"'>Edit</a></li><li><a href='javascript:void(0);' class='delete-client' data-id='"+data.cid+"'>Delete</a></ul></div></td>";
            return html_new_record;
    }
    
}
function getClients (limit,page,mode) 
{
    if(!limit)
    {
        limit = 10;
    }
    if(!page)
    {
        page = 1;
    }
    $.ajax({
        url: 'http://localhost/daily_times/ajax.php',
        type: "POST",
        data : { "mode" : "get_clients","limit" : limit , 'page' : page } ,
        dataType: "JSON",
        beforeSend: function () {
            $('.loading-holder').removeClass("hidden");
        },
        success:function (data) 
        {
            if(data)
            {
                if(data.success)
                {
                    if(data.results)
                    {
                        var html_new_record='',
                        tool_tip_html = '';
                        $.each(data.results,function(index,value){
                            html_new_record+="<tr id='"+value.cid+"'>"+client_td(value,'')+"</tr>";
                        }); 
                        $(".client-records").parent('.panel-box').removeClass('hidden');
                        if(mode=='html')
                        {
                            $(".client-records").removeClass('hidden').find('tbody').html(html_new_record);
                        }   
                        else
                        {
                            $(".client-records").removeClass('hidden').find('tbody').append(html_new_record);
                        }
                        $('[data-toggle="popover"]').popover();
                        if(data.results.length<10)
                        {
                          $('.load-more').addClass('hidden')  
                        }
                    }
                    else
                    {
                        if(data.message=='not_found')
                        {
                            $('.load-more').addClass('hidden')
                        }
                        else
                        {
                            $(".client-records").parent('.panel-box').addClass('hidden')
                        }
                    }
                    if(data.types)
                    {
                        var type_html = '';
                        $.each(data.types,function(index,value){
                            type_html+= "<option value="+value.type+">"+value.type+"</option>" 
                        });
                        $("#type").html(type_html)
                    }
                    console.log(data)
                    // window.location.href = './home.html';
                }
            }
        },
        error:function(data)
        {
            // $("#add_cust_btn").attr('disabled',false);
        },
        complete:function (data) 
        {
            $('.loading-holder').addClass("hidden");
        } 
    });
}
function getBills (limit,page,mode) 
{
    if(!limit)
    {
        limit = 10;
    }
    if(!page)
    {
        page = 1;
    }
    $.ajax({
        url: 'http://localhost/daily_times/ajax.php',
        type: "POST",
        data : { "mode" : "get_bills","limit" : limit , 'page' : page  } ,
        dataType: "JSON",
        beforeSend: function () {
            $('.loading-holder').removeClass("hidden");
        },
        success:function (data) 
        {
            if(data)
            {
                if(data.success)
                {
                    if(data.results)
                    {
                        var html_new_record='',
                        tool_tip_html_cust = '',tool_tip_html_cli = '';
                        $.each(data.results,function(index,value){
                            tool_tip_html_cust = '<a href="javascript:void(0);" class="btn btn-xs btn-info" data-toggle="popover" title="Customer Information" data-content="ID:'+value.cuid+', Name:'+value.cuname+'">Customer Info</a>';
                            tool_tip_html_cli = '<a href="javascript:void(0);" class="btn btn-xs btn-info" data-toggle="popover" title="Client Information" data-content="ID:'+value.clid+', Name:'+value.clname+'">Client Info</a>';
                            
                            html_new_record+= "<tr id='"+value.bid+"'><td>"+value.bid+"</td><td>"+value.bdate+"</td><td>"+value.type+"</td><td>"+tool_tip_html_cust+"</td><td>"+tool_tip_html_cli+"</td><td>"+value.site+"</td><td>"+value.period+"</td><td>"+value.caption+"</td><td>"+value.ro_num+"</td><td><div class='dropdown'><button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Actions<span class='caret'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0);' class='edit-bill' data-id='"+value.bid+"'>Edit</a></li><li><a href='javascript:void(0);' class='delete' data-action='bills' data-id='"+value.bid+"'>Delete</a></ul></div></td></tr>";
                        }); 
                        $(".bill-records").parent('.panel-box').removeClass('hidden');
                        if(mode=="html")
                        {
                            $(".bill-records").removeClass('hidden').find('tbody').html(html_new_record);
                        }
                        else
                        {
                            $(".bill-records").removeClass('hidden').find('tbody').append(html_new_record);
                        }
                        $('[data-toggle="popover"]').popover();
                        if(data.results.length<10)
                        {
                            $('.load-more').addClass('hidden')  
                        }
                    }
                    else
                    {
                        if(data.message=='not_found')
                        {
                            $('.load-more').addClass('hidden')
                        }
                        else
                        {
                            $(".bill-records").parent('.panel-box').addClass('hidden')
                        }
                    }
                    if(data.types)
                    {
                        var type_html = '';
                        $.each(data.types,function(index,value){
                            type_html+= "<option value="+value+">"+value+"</option>" 
                        });
                        $("#type").html(type_html)
                    }
                    if(data.sites)
                    {
                        var type_html_site = '';
                        $.each(data.sites,function(index,value){
                            type_html_site+= "<option value="+value+">"+value+"</option>" 
                        });
                        $("#site").html(type_html_site)
                    }
                    if(data.periods)
                    {
                        var type_html_periods = '';
                        $.each(data.periods,function(index,value){
                            type_html_periods+= "<option value="+value.pname+">"+value.pname+"</option>" 
                        });
                        $("#period").html(type_html_periods)
                    }

                    console.log(data)
                    // window.location.href = './home.html';
                }
            }
        },
        error:function(data)
        {
            // $("#add_cust_btn").attr('disabled',false);
        },
        complete:function (data) 
        {
            $('.loading-holder').addClass("hidden");
        } 
    });
}
function type_td(data,html_new_record)
{
    if(data.id)
    {
        html_new_record = html_new_record + "<td>"+data.id+"</td><td>"+data.type+"</td><td>"+data.description+"</td><td>"+data.cdays+"</td><td><div class='dropdown'><button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Actions<span class='caret'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0);' class='edit-type' data-id='"+data.id+"'>Edit</a></li><li><a href='javascript:void(0);' class='delete-type' data-id='"+data.id+"'>Delete</a></ul></div></td>";
        return html_new_record;
    }
} 
function getTypes(limit,page,mode)
{
    if(!limit)
    {
        limit = 10;
    }
    if(!page)
    {
        page = 1;
    }
    $.ajax({
        url: 'http://localhost/daily_times/ajax.php',
        type: "POST",
        data : { "mode" : "get_customer_types","limit" : limit , 'page' : page } ,
        dataType: "JSON",
        beforeSend: function () {
            $('.loading-holder').removeClass("hidden");
        },
        success:function (data) 
        {
            if(data)
            {
                if(data.success)
                {
                    if(data.results)
                    {
                        var html_new_record='';
                        $.each(data.results,function(index,value){
                            html_new_record+= "<tr id='"+value.id+"'>"+type_td(value,'')+"</tr>";
                        }); 
                        $(".type-records").parent('.panel-box').removeClass('hidden');
                        if(mode=="html")
                        {
                            $(".type-records").removeClass('hidden').find('tbody').html(html_new_record);
                        }
                        else
                        {
                            $(".type-records").removeClass('hidden').find('tbody').append(html_new_record);
                        }
                        if(data.results.length<10)
                        {
                          $('.load-more').addClass('hidden')  
                        }
                    }
                    else
                    {
                        if(data.message=='not_found')
                        {
                            $('.load-more').addClass('hidden')
                        }
                        else
                        {
                            $(".type-records").parent('.panel-box').addClass('hidden')
                        }
                    }
                    
                    console.log(data)
                    // window.location.href = './home.html';
                }
            }
        },
        error:function(data)
        {
            // $("#add_cust_btn").attr('disabled',false);
        },
        complete:function (data) 
        {
            $('.loading-holder').addClass("hidden");
        } 
    });
}
function rate_td(data,html_new_record)
{
    if(data.rid)
    {
        var tool_tip_html = '<a href="javascript:void(0);" class="btn btn-xs btn-info" data-toggle="popover" title="More Information" data-content=" Add pct:'+data.add_pct+', Extra:'+data.extra+', Description:'+data.description+'">More Info</a>';
        html_new_record = html_new_record+"<td>"+data.rid+"</td><td>"+data.code+"</td><td>"+data.kind+"</td><td>"+data.detail+"</td><td>"+data.rate+"</td><td>"+data.position+"</td><td>"+data.uom+"</td><td class='hidden'>"+data.add_pct+"</td><td class='hidden'>"+data.extra+"</td><td class='hidden'>"+data.description+"</td><td>"+tool_tip_html+"</td><td><div class='dropdown'><button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Actions<span class='caret'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0);' class='edit-rate' data-id='"+data.rid+"'>Edit</a></li><li><a href='javascript:void(0);' class='delete-rate' data-id='"+data.rid+"'>Delete</a></ul></div></td>";
        return html_new_record;
    }
}
function getRates(limit,page,mode)
{
    if(!limit)
    {
        limit = 10;
    }
    if(!page)
    {
        page = 1;
    }
    $.ajax({
        url: 'http://localhost/daily_times/ajax.php',
        type: "POST",
        data : { "mode" : "get_rates","limit" : limit , 'page' : page } ,
        dataType: "JSON",
        beforeSend: function () {
            $('.loading-holder').removeClass("hidden");
        },
        success:function (data) 
        {
            if(data)
            {
                if(data.success)
                {
                    if(data.results)
                    {
                        var html_new_record='',
                        tool_tip_html = '';
                        $.each(data.results,function(index,value){
                            html_new_record+= "<tr id='"+value.rid+"'>"+rate_td(value,'')+"</tr>";
                        }); 
                        $(".rate-records").parent('.panel-box').removeClass('hidden');
                        if(mode=='html')
                        {
                            $(".rate-records").removeClass('hidden').find('tbody').html(html_new_record);
                        }
                        else
                        {
                            $(".rate-records").removeClass('hidden').find('tbody').append(html_new_record);
                        }
                        $('[data-toggle="popover"]').popover();
                        if(data.results.length<10)
                        {
                          $('.load-more').addClass('hidden')  
                        }
                    }
                    else
                    {
                        if(data.message=='not_found')
                        {
                            $('.load-more').addClass('hidden')
                        }
                        else
                        {
                            $(".rate-records").parent('.panel-box').addClass('hidden')
                        }
                    }
                    console.log(data)
                    // window.location.href = './home.html';
                }
                else
                {
                    show_ajax_messages(data.message,'error');
                }
            }
            else
            {
                show_ajax_messages("Something Went Wrong. Please Contact your administrator",'error')
            }
        },
        error:function(data)
        {
            show_ajax_messages("Something Went Wrong. Please Contact your administrator",'error')
        },
        complete:function (data) 
        {
            $('.loading-holder').addClass("hidden");
        } 
    });
}

function clearingPeriodTd(data,html_new_record)
{
    if(data.id)
    {
        html_new_record = html_new_record + "<td>"+data.id+"</td><td>"+data.pname+"</td><td>"+data.from_date+"</td><td>"+data.to_date+"</td><td><div class='dropdown'><button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Actions<span class='caret'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0);' class='edit-period' data-id='"+data.id+"'>Edit</a></li><li><a href='javascript:void(0);' class='delete-period' data-id='"+data.id+"'>Delete</a></ul></div></td>";
        return html_new_record;
    }
                                        
}
function getClearingSection (limit,page,mode) 
{
    if(!limit)
    {
        limit = 10;
    }
    if(!page)
    {
        page = 1;
    }
    $.ajax({
        url: 'http://localhost/daily_times/ajax.php',
        type: "POST",
        data : { "mode" : "get_clearing_section" ,"limit" : limit , 'page' : page } ,
        dataType: "JSON",
        beforeSend: function () {
            $('.loading-holder').removeClass("hidden");
        },
        success:function (data) 
        {
            if(data)
            {
                if(data.success)
                {
                    if(data.results)
                    {
                        var html_new_record='';
                        $.each(data.results,function(index,value){
                            html_new_record+= "<tr id='"+value.id+"'>"+clearingPeriodTd(value,'')+"</tr>";
                        }); 
                        $(".period-records").parent('.panel-box').removeClass('hidden');
                        if(mode=="html")
                        {
                            $(".period-records").removeClass('hidden').find('tbody').html(html_new_record);
                        }
                        else
                        {
                            $(".period-records").removeClass('hidden').find('tbody').append(html_new_record);
                        }
                        if(data.results.length<10)
                        {
                          $('.load-more').addClass('hidden')  
                        }
                    }
                    else
                    {
                        if(data.message=='not_found')
                        {
                            $('.load-more').addClass('hidden')
                        }
                        else
                        {
                            $(".period-records").parent('.panel-box').addClass('hidden')
                        }
                    }
                    console.log(data)
                    // window.location.href = './home.html';
                }
            }
        },
        error:function(data)
        {
            // $("#add_cust_btn").attr('disabled',false);
        },
        complete:function (data) 
        {
            $('.loading-holder').addClass("hidden");
        } 
    });
}
function getConfigs()
{
    $.ajax({
        url: 'http://localhost/daily_times/ajax.php',
        type: "POST",
        data : { "mode" : "get_basic_configs"} ,
        dataType: "JSON",
        beforeSend: function () {
            $('.loading-holder').removeClass("hidden");
        },
        success:function (data) 
        {
            if(data)
            {
                if(data.success)
                {
                    if(data.results)
                    {
                        var valid_arr = ['sites','pagination','close_month','payment_type'];
                        $.each(data.results,function(index,value){
                            $("#"+valid_arr[index]).val(value.value);
                        });
                    }
                    console.log(data)
                    // window.location.href = './home.html';
                }
            }
        },
        error:function(data)
        {
            // $("#add_cust_btn").attr('disabled',false);
        },
        complete:function (data) 
        {
            $('.loading-holder').addClass("hidden");
        } 
    });
}


function delete_record(_this)
{
    var id = _this.data('id'),
    action = _this.data('action'),
    mode = '';
    if(action=='customer')
    {
        mode = 'delete_customer';
    }
    else if (action=='client') 
    {
        mode = 'delete_client'; 
    }
    else if(action=='bills')
    {
        mode = 'delete_customer';
    }
    else if(action=='ctypes')
    {
        mode = 'delete_type';
    }
    else if(action=='rates')
    {
        mode = 'delete_rate';
    }
    else if(action=='clearing_section')
    {
        mode = 'delete_period';
    }
    if(id)
    {
        $.ajax({
            url: 'http://localhost/daily_times/ajax.php',
            type: "POST",
            data : { "mode" : mode, id : id } ,
            dataType: "JSON",
            beforeSend: function () {
                $('.loading-holder').removeClass("hidden");
            },
            success:function (data) 
            {
                if(data)
                {
                    if(data.success)
                    {
                        $("#"+id).remove();
                        console.log(data)
                        // window.location.href = './home.html';
                    }
                }
            },
            error:function(data)
            {
                // $("#add_cust_btn").attr('disabled',false);
            },
            complete:function (data) 
            {   
                $('.loading-holder').addClass("hidden");
            } 
        }); 
    }
}


function show_ajax_messages(message,type)
{
    var class_name = '',
    message_parent = $('.alert_messages');
    if(type=='error')
    {
        class_name = 'alert-danger';
        message = '<strong>Warning!</strong> ' + message;
    }
    else
    {
        class_name = 'alert-success';
    }

    message_parent.find("#message").html(message)
    message_parent.removeClass('hidden').removeClass('alert-success').removeClass('alert-danger').addClass(class_name).addClass('open');
    setTimeout(function(){
        message_parent.addClass('hidden');
    }, 3000);

}
function submitConfigs(_this)
{
    if(_this)
    {
        $.ajax({
            url: 'http://localhost/daily_times/ajax.php',
            type: "POST",
            data : $('#basic_configs_form').serialize()+"&mode=add_configurations",
            dataType: "JSON",
            beforeSend: function () {
                $('.loading-holder').removeClass("hidden");
            },
            success:function (data) 
            {
                if(data)
                {
                    if(data.success)
                    {
                        show_ajax_messages(data.message,'success');
                        console.log(data)
                        // window.location.href = './home.html';
                    }
                    else
                    {
                        show_ajax_messages(data.message,'error');
                    }       
                }
                else
                {
                    show_ajax_messages("Something Went Wrong. Please Contact your administrator",'error');
                }
            },
            error:function(data)
            {
                show_ajax_messages("Something Went Wrong. Please Contact your administrator",'error');
            },
            complete:function (data) 
            {
                $('.loading-holder').addClass("hidden");
            } 
        }); 
    }
    
}