const template = ({ user,orderData, cartItems,paymentResult }) => {
  const today = new Date();
  return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Example 1</title>

  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="style.css" media="all" />
   <style>
    .clearfix:after {
  content: "";
  display: table;
  clear: both;
}

a {
  color: #5D6975;
  text-decoration: underline;
}

body {
  position: relative;
  width: 90%;
  display: flex;
  flex-direction: column;
  height: 29.7cm;
  margin: 0 auto;
  color: #001028;
  background: #FFFFFF;
  font-family: 'Roboto','Helvetica Neue', 'Helvetica';
  font-size: 1.2rem;
}

header {
  padding: 10px 0;
  margin-bottom: 30px;
}

#logo {
  text-align: center;
  margin-bottom: 10px;
}

#logo img {
  width: 200px;
  height:200px;
}

h1 {
  border-top: 1px solid  #5D6975;
  border-bottom: 1px solid  #5D6975;
  color: #5D6975;
  font-size: 2.4em;
  line-height: 1.4em;
  font-weight: normal;
  text-align: center;
  margin: 0 0 20px 0;
  background: url(https://raw.githubusercontent.com/suyash-patil/covercove/main/backend/utils/dimension.png);
}

#project {
  float: left;
}

#company span {
   color: #5D6975;
   margin-right: 10px;
   display: inline-block;
   font-size: 0.8em;
}

#project span {
  color: #5D6975;
  text-align: right;
  margin-right: 10px;
  display: inline-block;
  font-size: 0.8em;
}

#company {
  float: right;
  text-align: right;
}

#project div,
#company div {
  white-space: nowrap;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
}

table tr:nth-child(2n-1) td {
  background: #F5F5F5;
}

table th,
table td {
  text-align: center;
}

table th {
  padding: 5px 20px;
  color: #5D6975;
  border-bottom: 1px solid #C1CED9;
  white-space: nowrap;
  font-weight: normal;
}

table .service,
table .desc {
  text-align: left;
}

table td {
  padding: 20px;
  text-align: right;
}

table td.service,
table td.desc {
  vertical-align: top;
}

table td.unit,
table td.qty,
table td.total {
  font-size: 1.2em;
}

table td.grand {
  border-top: 1px solid #5D6975;;
}

#notices .notice {
  color: #5D6975;
  font-size: 1.2em;
}

footer {
  color: #5D6975;
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #C1CED9;
  padding: 8px 0;
  margin-top: auto;
  text-align: center;
}
  </style>
</head>

<body>
  <header class="clearfix">
    <div id="logo">
      <img src="https://raw.githubusercontent.com/suyash-patil/covercove/main/backend/utils/logo.png">
    </div>
    <h1>INVOICE</h1>
    <div id="company" class="clearfix">
      <div><span>RECEIPT ID</span> ${paymentResult.id}</div>
      <div><span>TRANSACTION ID</span> ${paymentResult.purchase_units[0].payments.captures[0].id}</div>
      <div><span>PAYMENT MODE</span> PayPal</div>
    </div>
    <div id="project">
      <div><span>NAME</span> ${user.name}</div>
      <div><span>ADDRESS LINE-1</span> ${orderData.shippingAddress.address}</div>
      <div><span>ADDRESS LINE-2</span> ${ orderData.shippingAddress.city + " " + "(" + orderData.shippingAddress.postalCode + ") " + orderData.shippingAddress.country}</div>
      <div><span>EMAIL ADDRESS</span> <a href=\`mailto:${user.email}\`>${user.email}</a></div>
      <div><span>SHOPPING</span> ${orderData.createdAt}</div>
      <div><span>PAYMENT</span> ${paymentResult.create_time}</div>

    </div>
  </header>
  <main>
    <table>
      <thead>
        <tr>
          <th class="service">BOOKS</th>
          <th class="desc">AUTHOR</th>
          <th class="unit">PRICE</th>
          <th class="qty">QTY</th>
          <th class="total">TOTAL</th>
        </tr>
      </thead>
      <tbody>
         ${cartItems.map((item) => (
            `<tr>
               <td class="service">${item.name}</td>
               <td class="desc">${item.author}</td>
               <td class="unit">$${item.price}</td>
               <td class="qty">${item.count}</td>
               <td class="total">$${item.price * item.count}</td>
            </tr>`
         ))}
        <tr>
          <td colspan="4">SUBTOTAL</td>
          <td class="total">$${orderData.itemPrice}</td>
        </tr>
        <tr>
          <td colspan="4">SHIPPING</td>
          <td class="total">$${orderData.shippingPrice}</td>
        </tr>
        <tr>
          <td colspan="4">TAX 7%</td>
          <td class="total">$${orderData.taxPrice}</td>
        </tr>
        <tr>
          <td colspan="4" class="grand total">GRAND TOTAL</td>
          <td class="grand total">$${orderData.totalPrice}</td>
        </tr>
      </tbody>
    </table>
    <div id="notices">
      <div>NOTICE:</div>
      <div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
    </div>
  </main>
  <footer>

  </footer>
</body>

</html>
    `;
};

export default template