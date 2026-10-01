let orderCode = "";
let isOrderValid = false;
let totalRevenue = 0;
let choice;

do {
    console.log(`MENU
1: Nhập và chuẩn hóa mã đơn hàng
2: Tính tiền và in hóa đơn phụ kiện
3: Thoát chương trình`);
    choice = +prompt("Vui long nhap lua chon cua ban: ");

    switch (choice) {
        case 1: {
            orderCode = "";
            isOrderValid = false;
            let input = prompt("Nhap ma don hang: ");

            if (input === null || input.trim() === "") {
                console.log("Ma don hang khong duoc de trong!");
                break;
            }

            orderCode = input.trim().toUpperCase();

            if (orderCode.length < 8) {
                console.log("Ma don hang phai co it nhat 8 ki tu!");
                orderCode = "";
                break;
            }

            isOrderValid = true;
            console.log("----------------------------------------");
            console.log("Nhap ma don hang thanh cong!");
            console.log(`Ma don hang: ${orderCode}`);
            console.log("Da mo khoa chuc nang tinh tien.");
            console.log("----------------------------------------");
            break;
        }
        case 2: {
            if (isOrderValid !== true) {
                console.log("Khong tim thay don hang hop le!");
                break;
            }

            let currentOrder = orderCode;
            let shakerPrice = 120000;
            let glovesPrice = 180000;
            let strapPrice = 150000;
            let shakerQuantity = 0;
            let glovesQuantity = 0;
            let strapQuantity = 0;
            let checkVip = "";
            let discount = 0;

            let shakerInput = +prompt("Nhap so luong binh shake: ");
            shakerQuantity = shakerInput;
            let glovesInput = +prompt("Nhap so luong gloves: ");
            glovesQuantity = glovesInput;
            let strapInput = +prompt("Nhap so luong strap: ");
            strapQuantity = strapInput;

            let shakerTotal = shakerPrice * shakerQuantity;
            let glovesTotal = glovesPrice * glovesQuantity;
            let strapTotal = strapPrice * strapQuantity;
            let totalPrice = shakerTotal + glovesTotal + strapTotal;

            checkVip = prompt("Ban co phai la VIP? (Y/N): ");
            checkVip = checkVip.trim().toUpperCase();

            if (checkVip === "Y") {
                discount = totalPrice * 0.1;
            }

            let total = totalPrice - discount;
            console.log("");
            console.log("-".repeat(50));
            console.log("              HOA DON BAN LE");
            console.log("-".repeat(50));
            console.log(`Ma don hang: ${currentOrder}`);
            console.log("-".repeat(50));
            console.log("San pham     So luong     Don gia     Thanh tien");
            console.log("-".repeat(50));
            console.log(`SHAKER       ${shakerQuantity}            ${shakerPrice}        ${shakerTotal}`);
            console.log(`GLOVES       ${glovesQuantity}            ${glovesPrice}        ${glovesTotal}`);
            console.log(`STRAP        ${strapQuantity}            ${strapPrice}        ${strapTotal}`);
            console.log("-".repeat(50));
            console.log(`Tong tien: ${totalPrice} VNĐ`);
            console.log(`Giam VIP: ${discount} VNĐ`);
            console.log(`Thanh toan: ${total} VNĐ`);
            console.log("-".repeat(50));

            totalRevenue += total;
            orderCode = "";
            isOrderValid = false;
            break;
        }
        case 3: {
            console.log("----------------------------------------");
            console.log("Cam on ban da su dung chuong trinh!");
            console.log(`Tong doanh thu: ${totalRevenue.toLocaleString("vi-VN")} VNĐ`);
            console.log("----------------------------------------");
            break;
        }
        default: {
            console.log("Lua chon khong hop le!");
            break;
        }
    }
} while (choice != 3);