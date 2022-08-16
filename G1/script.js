function acp_compute() {
    try {
        
        if (document.getElementById("acp_variable").value == "" || document.getElementById("acp_point").value == "" || document.getElementById("acp_degree").value == "" || document.getElementById("acp_decimal").value== "") {
            window.alert("Input incomplete. Please fill up the required fields.")
        }
        else {
            variable    = parseFloat(document.getElementById("acp_variable").value);
            point       = parseFloat(document.getElementById("acp_point").value);
            degree      = parseFloat(document.getElementById("acp_degree").value);
            decimal     = parseFloat(document.getElementById("acp_decimal").value);

            //Formula
            dx_cos   = -Math.sin(point);
            dx_nsin  = -Math.cos(point);
            dx_ncos  =  Math.sin(point);
            dx_sin   =  Math.cos(point);

            res_fm = [];
            deg_fm = degree;

            while(deg_fm > 0) {
                if(deg_fm > 0 ){
                    res_fm.push(dx_cos);
                    deg_fm -= 1;
                }
                if(deg_fm > 0 ){
                    res_fm.push(dx_nsin);
                    deg_fm -= 1;
                }
                if(deg_fm > 0 ){
                    res_fm.push(dx_ncos);
                    deg_fm -= 1;
                }
                if(deg_fm > 0 ){
                    res_fm.push(dx_sin);
                    deg_fm -= 1;
                }
            }


            // Final Calculation
            final_ans = Math.cos(point);
            num_rise  = 0;

            for( i = 0; i < degree; i++ ) {
                num_rise += 1;
                if (point == 0) {
                    final_ans += ((res_fm[i]) * variable ** num_rise) / factorial(i+1);
                }
                else {
                    final_ans += ( (1 / factorial(i+1)) * (variable - point) ** num_rise) * (res_fm[i])
                }
            }

            // Results
            document.getElementById("result_true_value").innerHTML          = Math.cos(variable);
            document.getElementById("result_approximate_vlaue").innerHTML   = final_ans;
            document.getElementById("result_chopping").innerHTML            = truncate(final_ans, decimal);
            document.getElementById("result_rounding").innerHTML            = final_ans.toFixed(decimal);

            // Errors
            document.getElementById("ate_av").innerHTML = Math.abs(Math.cos(variable) - final_ans);
            document.getElementById("ate_c").innerHTML  = Math.abs(Math.cos(variable) - truncate(final_ans, decimal));
            document.getElementById("ate_r").innerHTML  = Math.abs(Math.cos(variable) - final_ans.toFixed(decimal));

            document.getElementById("pe_av").innerHTML = (Math.abs(Math.cos(variable) - final_ans) / Math.cos(variable)) * 100 + "%";
            document.getElementById("pe_c").innerHTML  = (Math.abs(Math.cos(variable) - truncate(final_ans, decimal)) / Math.cos(variable)) * 100 + "%";
            document.getElementById("pe_r").innerHTML  = (Math.abs(Math.cos(variable) - final_ans.toFixed(decimal)) / Math.cos(variable)) * 100 + "%";
        }
    }
    catch(e) {
        window.alert("There was an error in your input field. Please try again.")
    }
}

function factorial(num) {
    if (num < 0) 
          return -1;
    else if (num == 0) 
        return 1;
    else {
        return (num * factorial(num - 1));
    }
}
function truncate(number, digits) {
    stepper = 10.0 ** digits
    return Math.trunc(stepper * number) / stepper
}
function acp_clear() {
    document.getElementById("acp_variable").value   = "";
    document.getElementById("acp_point").value      = "";
    document.getElementById("acp_degree").value     = "";
    document.getElementById("acp_decimal").value    = "";

    // Results
    document.getElementById("result_true_value").innerHTML          = "---";
    document.getElementById("result_approximate_vlaue").innerHTML   = "---";
    document.getElementById("result_chopping").innerHTML            = "---";
    document.getElementById("result_rounding").innerHTML            = "---";

    // Errors
    document.getElementById("ate_av").innerHTML = "---";
    document.getElementById("ate_c").innerHTML  = "---";
    document.getElementById("ate_r").innerHTML  = "---";

    document.getElementById("pe_av").innerHTML = "---";
    document.getElementById("pe_c").innerHTML  = "---";
    document.getElementById("pe_r").innerHTML  = "---";
}