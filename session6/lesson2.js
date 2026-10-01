let registeredMembers = 0;
let memberNames = [];
let memberCards = [];
let totalRevenue = 0;
let checkInCount = 0;
let choice;
let currentYear = new Date().getFullYear();

do {
    console.log(`MENU
1: Đăng ký hội viên
2: Tính phí gói tập
3: Check-in
4: Báo cáo và thoát`);
    choice = +prompt("Vui lòng chọn chức năng:");

    switch (choice) {
        case 1: {
            let name = prompt("Nhập họ tên hội viên:");
            let cardCode = prompt(`Nhập mã thẻ (GYM-STANDARD-${currentYear} hoặc GYM-VIP-${currentYear}):`);

            if (name === null || name.trim() === "" || cardCode === null) {
                console.log("Thông tin hội viên không được để trống!");
                break;
            }

            name = name.trim();
            cardCode = cardCode.trim().toUpperCase();

            if (cardCode.indexOf("GYM-") !== 0 || cardCode.slice(-4) !== String(currentYear)) {
                console.log(`Mã thẻ phải bắt đầu bằng GYM- và kết thúc bằng ${currentYear}.`);
                break;
            }

            let isDuplicate = false;
            for (let i = 0; i < registeredMembers; i++) {
                if (memberCards[i] === cardCode) {
                    isDuplicate = true;
                    break;
                }
            }

            if (isDuplicate === true) {
                console.log("Mã thẻ này đã được đăng ký!");
                break;
            }

            memberNames[registeredMembers] = name;
            memberCards[registeredMembers] = cardCode;
            registeredMembers++;
            console.log(`Đăng ký hội viên thành công: ${name} | Mã thẻ: ${cardCode}`);
            break;
        }

        case 2: {
            if (registeredMembers === 0) {
                console.log("Chưa có hội viên. Vui lòng đăng ký trước!");
                break;
            }

            let cardCode = prompt("Nhập mã thẻ hội viên:");
            if (cardCode === null) {
                console.log("Mã thẻ không được để trống!");
                break;
            }
            cardCode = cardCode.trim().toUpperCase();

            let memberIndex = -1;
            for (let i = 0; i < registeredMembers; i++) {
                if (memberCards[i] === cardCode) {
                    memberIndex = i;
                    break;
                }
            }

            if (memberIndex === -1) {
                console.log("Không tìm thấy hội viên với mã thẻ này!");
                break;
            }

            let plan = prompt("Chọn gói tập (STANDARD/VIP):");
            if (plan === null) {
                console.log("Gói tập không được để trống!");
                break;
            }
            plan = plan.trim().toUpperCase();

            let planPrice = 0;
            if (plan === "STANDARD") {
                planPrice = 500000;
            } else if (plan === "VIP") {
                planPrice = 800000;
            } else {
                console.log("Gói tập không hợp lệ!");
                break;
            }

            let months = +prompt("Nhập số tháng đăng ký:");
            let ptSessions = +prompt("Nhập số buổi PT (0 nếu không thuê):");

            if (months < 1 || months % 1 !== 0 || ptSessions < 0 || ptSessions % 1 !== 0) {
                console.log("Số tháng hoặc số buổi PT không hợp lệ!");
                break;
            }

            let membershipFee = planPrice * months;
            let discount = 0;
            if (months >= 12) {
                discount = membershipFee * 0.25;
            } else if (months >= 6) {
                discount = membershipFee * 0.15;
            }

            let ptFee = ptSessions * 300000;
            let total = membershipFee - discount + ptFee;
            totalRevenue += total;

            console.log(`Hội viên: ${memberNames[memberIndex]} | Gói: ${plan} | Thời hạn: ${months} tháng`);
            console.log(`Tiền gói: ${membershipFee} VNĐ | Giảm giá: ${discount} VNĐ`);
            console.log(`Tiền PT: ${ptFee} VNĐ | Tổng thanh toán: ${total} VNĐ`);
            break;
        }

        case 3: {
            let cardCode = prompt("Quét hoặc nhập mã thẻ hội viên:");
            if (cardCode === null) {
                console.log("Mã thẻ không được để trống!");
                break;
            }
            cardCode = cardCode.trim().toUpperCase();

            if (cardCode.indexOf("GYM-") !== 0 || cardCode.slice(-4) !== String(currentYear)) {
                console.log(`Mã thẻ không hợp lệ. Mã phải bắt đầu bằng GYM- và kết thúc bằng ${currentYear}.`);
                break;
            }

            let memberIndex = -1;
            for (let i = 0; i < registeredMembers; i++) {
                if (memberCards[i] === cardCode) {
                    memberIndex = i;
                    break;
                }
            }

            if (memberIndex === -1) {
                console.log("Không tìm thấy hội viên đã đăng ký!");
                break;
            }

            checkInCount++;
            console.log(`Check-in thành công: ${memberNames[memberIndex]} | Mã thẻ: ${cardCode}`);
            console.log(`Tổng lượt check-in trong ca: ${checkInCount}`);
            break;
        }

        case 4: {
            console.log("========== BÁO CÁO CA TRỰC ==========");
            console.log(`Số hội viên đã đăng ký: ${registeredMembers}`);
            console.log(`Số lượt check-in: ${checkInCount}`);
            console.log(`Tổng doanh thu: ${totalRevenue.toLocaleString("vi-VN")} VNĐ`);
            console.log("Kết thúc ca trực!");
            break;
        }
        
        default: {
            console.log("Lựa chọn không hợp lệ!");
            break;
        }
    }
} while (choice !== 4);