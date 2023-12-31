const shipptingListEl = document.getElementById('shipping-list');
const checkAll = document.getElementById('check-all');
const totalEl = document.getElementById('total');
const changeStatusBtn = document.getElementById('change-status');

function formatDate(createdAt) {
    const orderDate = createdAt.split('.')[0];
    const date = orderDate.split('T')[0];
    const time = orderDate.split('T')[1];

    return `${date} ${time}`;
}

function selectAllCheckboxes() {
    const checkBoxElList = Array.from(document.querySelectorAll('#check-item'));

    if (checkAll.checked) {
        checkBoxElList.forEach(el => {
            const element = el;
            element.checked = true;
        });
    } else {
        checkBoxElList.forEach(el => {
            const element = el;
            element.checked = false;
        });
    }
}

function changeStatus() {

}

function setOrderList(date, id, addressee, orderItems, totalPrice) {
    const element = `<tr>
    <td><input class="form-check-input" type="checkbox" id="check-item"></td>
              <td id="shipping-date">${date.replace(' ', '<br>')}</td>
              <td id="shipping-id">${id}</td>
              <td id="shipping-username">${addressee}</td>
              <td id="shipping-product">${orderItems}</td>
              <td id="shipping-vertify">${orderItems.length}</td>
              <td id="shipping-price">${totalPrice}</td>
            </tr>`

    shipptingListEl.insertAdjacentHTML('beforeend', element);
}

async function insertOrderList() {
    const url = './orderlistdata.json';    // 임시 데이터
    // const url = '';

    try {
        // const res = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         status: "배송 중"
        //     })
        // });
        const res = await fetch(url);

        const data = await res.json();

        const { orders } = data;
        orders.forEach(order => {
            const { createdAt, address, orderItems, totalPrice, _id: id } = order;
            const { addressee } = address;
            const date = formatDate(createdAt);

            setOrderList(date, id, addressee, orderItems, totalPrice);
        });

        totalEl.innerText = `[총 ${orders.length}개]`;

    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line no-alert
        alert('주문 조회 중 오류 발생 : ', err);
    }
}

insertOrderList();
changeStatusBtn.addEventListener('click', changeStatus);
checkAll.addEventListener('click', selectAllCheckboxes);