let isMemberValid = false;
let memberName = "";
let memberCard = "";
let memberType = "";
let lockerZone = "";
let itemLog = "";
let isReceiptPrinted = false;
let memberCount = 0;
let receiptCount = 0;
let totalSupplyFees = 0;
let totalDeposits = 0;
let choice;
let currentYear = new Date().getFullYear();

do {
    console.log(`MENU
1: Tiếp nhận và xác thực thẻ hội viên
2: Ghi nhận vật tư mượn thêm
3: In phiếu bàn giao và tính phụ phí
4: Đóng ca và thoát`);
    choice = +prompt("Vui lòng chọn chức năng:");

    switch (choice) {
        case 1: {
            if (isMemberValid === true && isReceiptPrinted === false) {
                console.log("Vui lòng in phiếu bàn giao hiện tại trước khi tiếp nhận hội viên tiếp theo!");
                break;
            }

            isMemberValid = false;
            let nameInput = prompt("Nhập họ tên hội viên:");
            let cardInput = prompt("Quét hoặc nhập mã thẻ hội viên:");

            if (nameInput === null || nameInput.trim() === "" || cardInput === null) {
                console.log("Thông tin hội viên không được để trống!");
                break;
            }

            memberName = nameInput.trim();
            memberCard = cardInput.trim().toUpperCase();

            if (memberCard.indexOf("GYM-") !== 0 || memberCard.slice(-4) !== String(currentYear)) {
                console.log(`Thẻ không hợp lệ. Mã thẻ phải bắt đầu bằng GYM- và kết thúc bằng ${currentYear}.`);
                isMemberValid = false;
                break;
            }

            let planInput = prompt("Nhập hạng hội viên (VIP/STANDARD):");
            if (planInput === null) {
                console.log("Hạng hội viên không được để trống!");
                isMemberValid = false;
                break;
            }

            memberType = planInput.trim().toUpperCase();
            if (memberType !== "VIP" && memberType !== "STANDARD") {
                console.log("Hạng hội viên không hợp lệ!");
                isMemberValid = false;
                break;
            }

            isMemberValid = true;
            itemLog = "";
            isReceiptPrinted = false;

            if (memberType === "VIP") {
                lockerZone = "ZONE-A";
                console.log(`Đã xác thực ${memberName} | Cấp tủ ${lockerZone} | Kèm 1 khăn tắm lớn miễn phí.`);
            } else {
                lockerZone = "ZONE-B";
                console.log(`Đã xác thực ${memberName} | Cấp tủ ${lockerZone}.`);
            }

            memberCount++;
            break;
        }
        case 2: {
            if (isMemberValid === false) {
                console.log("Vui lòng tiếp nhận và xác thực hội viên trước!");
                break;
            }

            if (itemLog !== "") {
                console.log("Đã ghi nhận vật tư cho hội viên này. Hãy in phiếu trước khi tiếp nhận hội viên tiếp theo.");
                break;
            }

            let logInput = prompt("Nhập vật tư (ví dụ: TOWEL:2|LOCK:1|MAT:1):");
            if (logInput === null || logInput.trim() === "") {
                console.log("Nhật ký vật tư không được để trống!");
                break;
            }

            itemLog = logInput.trim().toUpperCase();
            isReceiptPrinted = false;
            console.log(`Đã ghi nhận nhật ký vật tư: ${itemLog}`);
            break;
        }
        case 3: {
            if (isMemberValid === false) {
                console.log("Vui lòng tiếp nhận và xác thực hội viên trước!");
                break;
            }

            let remainingLog = itemLog;
            let towelQuantity = 0;
            let lockQuantity = 0;
            let matQuantity = 0;
            let isLogValid = true;

            while (remainingLog !== "") {
                let separatorIndex = remainingLog.indexOf("|");
                let itemEntry = "";

                if (separatorIndex === -1) {
                    itemEntry = remainingLog;
                    remainingLog = "";
                } else {
                    itemEntry = remainingLog.slice(0, separatorIndex);
                    remainingLog = remainingLog.slice(separatorIndex + 1);
                }

                itemEntry = itemEntry.trim();
                let colonIndex = itemEntry.indexOf(":");
                if (colonIndex === -1) {
                    isLogValid = false;
                    continue;
                }

                let itemName = itemEntry.slice(0, colonIndex).trim();
                let quantity = +itemEntry.slice(colonIndex + 1).trim();

                if (quantity < 1 || quantity % 1 !== 0) {
                    isLogValid = false;
                } else if (itemName === "TOWEL") {
                    towelQuantity += quantity;
                } else if (itemName === "LOCK") {
                    lockQuantity += quantity;
                } else if (itemName === "MAT") {
                    matQuantity += quantity;
                } else {
                    isLogValid = false;
                }
            }

            if (isLogValid === false) {
                console.log("Nhật ký không hợp lệ. Chỉ dùng TOWEL, LOCK, MAT với số lượng nguyên dương.");
                break;
            }

            let towelFee = towelQuantity * 20000;
            let lockFee = lockQuantity * 15000;
            let matFee = 0;
            let extraFee = towelFee + lockFee + matFee;
            let deposit = 0;

            if (towelQuantity + lockQuantity + matQuantity > 0) {
                deposit = 50000;
            }

            console.log("================ PHIẾU BÀN GIAO ================");
            console.log(`Hội viên: ${memberName} | Mã thẻ: ${memberCard}`);
            console.log(`Hạng: ${memberType} | Khu tủ: ${lockerZone}`);
            console.log("-------------------------------------------------");
            console.log(`${"VẬT TƯ".padEnd(12)} ${"SỐ LƯỢNG".padStart(8)} ${"ĐƠN GIÁ".padStart(12)} ${"THÀNH TIỀN".padStart(14)}`);
            console.log(`${"TOWEL".padEnd(12)} ${String(towelQuantity).padStart(8)} ${String(20000).padStart(12)} ${String(towelFee).padStart(14)}`);
            console.log(`${"LOCK".padEnd(12)} ${String(lockQuantity).padStart(8)} ${String(15000).padStart(12)} ${String(lockFee).padStart(14)}`);
            console.log(`${"MAT".padEnd(12)} ${String(matQuantity).padStart(8)} ${"N/A".padStart(12)} ${String(matFee).padStart(14)}`);

            if (memberType === "VIP") {
                console.log("Khăn tắm lớn VIP miễn phí: 1 chiếc.");
            }

            console.log("-------------------------------------------------");
            console.log(`Tổng phụ phí vật tư: ${extraFee.toLocaleString("vi-VN")} VNĐ`);
            console.log(`Tiền đặt cọc: ${deposit.toLocaleString("vi-VN")} VNĐ (hoàn lại khi trả vật tư)`);
            console.log(`Tổng thu tạm thời: ${(extraFee + deposit).toLocaleString("vi-VN")} VNĐ`);
            console.log("=================================================");

            if (isReceiptPrinted === false) {
                totalSupplyFees += extraFee;
                totalDeposits += deposit;
                receiptCount++;
                isReceiptPrinted = true;
            }
            break;
        }
        case 4: {
            console.log("========== BÁO CÁO BÀN GIAO CA ==========");
            console.log(`Số lượt tiếp nhận hội viên: ${memberCount}`);
            console.log(`Số phiếu đã in: ${receiptCount}`);
            console.log(`Tổng phụ phí vật tư: ${totalSupplyFees.toLocaleString("vi-VN")} VNĐ`);
            console.log(`Tiền cọc đang giữ (cần hoàn lại): ${totalDeposits.toLocaleString("vi-VN")} VNĐ`);
            console.log("Đóng ca làm việc.");
            break;
        }
        default: {
            console.log("Lựa chọn không hợp lệ!");
            break;
        }
    }
} while (choice !== 4);