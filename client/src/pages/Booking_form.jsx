import React from 'react';

function bookingForm(){
    return(
        <div>

            
            <form method="POST">
                <table>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" placeholder="Enter name"/></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type="text" placeholder="Enter email address"/></td>
                    </tr>
                    <tr>
                        <td>Select chekin</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Select checkout</td>
                        <td></td>
                    </tr>

                </table>


            </form>




        </div>



    )



}
export default bookingForm;
