export const ComplaintMail = (vars:any) =>`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<table cellspacing="0" cellpadding="0" style="background:#eef0f1;width:100%;">
<tbody>
    <tr width="100%">
        <td>
            <table cellspacing="15"
                style="padding:2%;margin:50px auto;width:50vw;background-color: #fff;color:#4C4C4C;font-family: Arial, Helvetica, sans-serif;">
                <tbody>
                    <tr width="100%">
                        <th colspan="2" style="fint-size: 1.5vw;">LIBRO DE RECLAMACIONES</th>
                    </tr>
                    <tr width="100%">
                        <th colspan="2">DATOS DEL CLIENTE</th>
                    </tr>
                    <tr width="100%">
                        <th align="left">Nombres y Apellidos</th>
                        <td>${vars.fname} ${vars.lname} ${vars.mlname}</td>
                    </tr>
                    <tr width="100%">
                        <th align="left">Email</th>
                        <td>${vars.email}</td>
                    </tr>
                    <tr width="100%">
                        <th align="left">Teléfono</th>
                        <td>${vars.phone}</td>
                    </tr>
                    <tr width="100%">
                        <th align="left">${vars.idType}</th>
                        <td>${vars.idNumber}</td>
                    </tr>
                    <tr width="100%">
                        <th align="left">Departamento</th>
                        <td>${vars.region}</td>
                    </tr>
                    <tr width="100%">
                        <th align="left">Provincia</th>
                        <td>${vars.province}</td>
                    </tr>
                    <tr width="100%">
                        <th align="left">Distrito</th>
                        <td>${vars.district}</td>
                    </tr>
                    <tr width="100%">
                        <th align="left">Dirección</th>
                        <td>${vars.address}</td>
                    </tr>
                    <tr width="100%">
                        <th colspan="2">IDENTIFICACIÓN DEL BIEN CONTRATADO</th>
                    </tr>
                    <tr width="100%">
                        <th align="left">Tipo Bien Contratado</th>
                        <td>${vars.typeOfGood}</td>
                    </tr>
                    <tr width="100%">
                        <th align="left">N° de Pedido</th>
                        <td>${vars.orderNumber}</td>
                    </tr>
                    <tr width="100%">
                        <th align="left">Monto</th>
                        <td>${vars.amount}</td>
                    </tr>
                    <tr width="100%">
                        <th align="left">Descripción</th>
                        <td>
                            <p>${vars.goodDescription}</p>
                        </td>
                    </tr>
                    <tr width="100%">
                        <th colspan="2">DETALLE DE LA RECLAMACIÓN</th>
                    </tr>
                    <tr width="100%">
                        <th align="left">Tipo de reclamo</th>
                        <td>${vars.complaintType}</td>
                    </tr>
                    <tr width="100%">
                        <th align="left">Descripción</th>
                        <td>${vars.complaintDetail}</td>
                    </tr>
                    <tr width="100%">
                        <th align="left">Pedido del consumidor</th>
                        <td>${vars.consumerPetiton}</td>
                    </tr>
                    <tr width="100%">
                        <th colspan="2">ACCIONES ADOPTADAS POR EL VENDEDOR</th>
                    </tr>
                    <tr width="100%">
                        <th align="left">Descripción</th>
                        <td>${vars.sellerAction}</td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
</tbody>
</table>
</body>
</html>`