let employees = [
  { employeeCode: "EMP-001", fullName: "Ngô Thanh Tùng", department: "Phòng Kỹ Thuật", age: 28, experienceYears: 5 },
  { employeeCode: "EMP-002", fullName: "Hồ Thị Thu", department: "Phòng Nhân Sự", age: 35, experienceYears: 10 },
  { employeeCode: "EMP-003", fullName: "Mai Quốc Việt", department: "Phòng Kỹ Thuật", age: 24, experienceYears: 1 }
];

const LINE = "=".repeat(55);

const MENU_TEXT =
  LINE + "\n" +
  "  HỆ THỐNG QUẢN LÝ NHÂN VIÊN CÔNG TY SKYTECH\n" +
  LINE + "\n" +
  "1. Hiển thị danh sách nhân viên\n" +
  "2. Thêm nhân viên mới\n" +
  "3. Cập nhật thông tin nhân viên\n" +
  "4. Xóa nhân viên\n" +
  "5. Tìm kiếm nhân viên theo phòng ban\n" +
  "0. Thoát chương trình\n" +
  LINE + "\n" +
  "Vui lòng nhập lựa chọn của bạn (0 - 5):";

function normalizeText(rawText) {
  const words = rawText.trim().split(/\s+/);
  const result = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word !== "") {
      result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    }
  }
  return result.join(" ");
}

function findEmployeeIndex(code) {
  const normalizedCode = code.trim().toUpperCase();
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].employeeCode === normalizedCode) {
      return i;
    }
  }
  return -1;
}

function validateEmployeeCode(code) {
  const normalizedCode = code.trim().toUpperCase();

  if (normalizedCode === "") {
    return "Lỗi: Chưa nhập mã nhân viên";
  }
  if (normalizedCode.length < 6) {
    return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
  }
  if (!normalizedCode.startsWith("EMP-")) {
    return 'Lỗi: Sai tiền tố "EMP-"';
  }
  if (/\s/.test(normalizedCode)) {
    return "Lỗi: Chứa khoảng trắng";
  }
  if (findEmployeeIndex(normalizedCode) !== -1) {
    return "Lỗi: Mã nhân viên đã tồn tại";
  }
  return "";
}

function inputIntegerInRange(message, min, max) {
  while (true) {
    const raw = prompt(message);
    if (raw === null) {
      return null;
    }
    const text = raw.trim();
    if (!/^-?\d+$/.test(text)) {
      console.log("Lỗi: Vui lòng nhập một số nguyên hợp lệ.");
      continue;
    }
    const value = Number(text);
    if (value < min || value > max) {
      console.log("Lỗi: Giá trị phải nằm trong khoảng từ " + min + " đến " + max + ".");
      continue;
    }
    return value;
  }
}

function displayEmployees(list) {
  if (list.length === 0) {
    console.log("Danh sách nhân viên trống");
    return;
  }
  for (let i = 0; i < list.length; i++) {
    const emp = list[i];
    console.log((i + 1) + ". " + emp.employeeCode + " - " + emp.fullName + " - " + emp.department);
    console.log("   Tuổi: " + emp.age + " | Số năm kinh nghiệm: " + emp.experienceYears);
  }
  console.log("Tổng: " + list.length + " nhân viên");
}

function inputNonEmptyText(message) {
  while (true) {
    const raw = prompt(message);
    if (raw === null) {
      return null;
    }
    const text = normalizeText(raw);
    if (text === "") {
      console.log("Lỗi: Không được để trống, vui lòng nhập lại.");
      continue;
    }
    return text;
  }
}

function printEmployeeInfo(emp) {
  console.log("Mã nhân viên: " + emp.employeeCode);
  console.log("Họ tên: " + emp.fullName);
  console.log("Phòng ban: " + emp.department);
  console.log("Tuổi: " + emp.age);
  console.log("Số năm kinh nghiệm: " + emp.experienceYears);
}

function handleDisplay() {
  if (employees.length === 0) {
    displayEmployees(employees);
    return;
  }
  const choice = prompt(
    "Chọn cách hiển thị:\n1. Theo thứ tự hiện tại\n2. Sắp xếp theo số năm kinh nghiệm tăng dần"
  );
  let listToShow = employees;
  if (choice !== null && choice.trim() === "2") {
    listToShow = employees.slice().sort(function (a, b) {
      return a.experienceYears - b.experienceYears;
    });
  }
  displayEmployees(listToShow);
}

function handleAdd() {
  const rawCode = prompt("Nhập mã nhân viên (ví dụ EMP-004):");
  if (rawCode === null) {
    console.log("Đã hủy thao tác thêm.");
    return;
  }
  const errorMessage = validateEmployeeCode(rawCode);
  if (errorMessage !== "") {
    console.log(errorMessage);
    return;
  }
  const employeeCode = rawCode.trim().toUpperCase();

  const fullName = inputNonEmptyText("Nhập họ tên:");
  if (fullName === null) {
    console.log("Đã hủy thao tác thêm.");
    return;
  }
  const department = inputNonEmptyText("Nhập phòng ban:");
  if (department === null) {
    console.log("Đã hủy thao tác thêm.");
    return;
  }
  const age = inputIntegerInRange("Nhập tuổi (18 - 60):", 18, 60);
  if (age === null) {
    console.log("Đã hủy thao tác thêm.");
    return;
  }
  const experienceYears = inputIntegerInRange("Nhập số năm kinh nghiệm (0 - 40):", 0, 40);
  if (experienceYears === null) {
    console.log("Đã hủy thao tác thêm.");
    return;
  }

  const newEmployee = {
    employeeCode: employeeCode,
    fullName: fullName,
    department: department,
    age: age,
    experienceYears: experienceYears
  };
  employees.push(newEmployee);
  console.log("Thêm nhân viên thành công:");
  printEmployeeInfo(newEmployee);
}

function handleUpdate() {
  const rawCode = prompt("Nhập mã nhân viên cần cập nhật:");
  if (rawCode === null) {
    console.log("Đã hủy thao tác cập nhật.");
    return;
  }
  const code = rawCode.trim().toUpperCase();
  const index = findEmployeeIndex(code);
  if (index === -1) {
    console.log("Không tìm thấy nhân viên có mã " + code);
    return;
  }
  const emp = employees[index];

  const newAge = inputIntegerInRange("Nhập tuổi mới (18 - 60):", 18, 60);
  if (newAge === null) {
    console.log("Đã hủy cập nhật, nhân viên giữ nguyên giá trị cũ.");
    return;
  }
  const newExperience = inputIntegerInRange("Nhập số năm kinh nghiệm mới (0 - 40):", 0, 40);
  if (newExperience === null) {
    console.log("Đã hủy cập nhật, nhân viên giữ nguyên giá trị cũ.");
    return;
  }

  const oldAge = emp.age;
  const oldExperience = emp.experienceYears;
  emp.age = newAge;
  emp.experienceYears = newExperience;
  console.log("Cập nhật thành công nhân viên " + emp.employeeCode + ":");
  console.log("Trước: Tuổi " + oldAge + " | Số năm kinh nghiệm " + oldExperience);
  console.log("Sau:   Tuổi " + emp.age + " | Số năm kinh nghiệm " + emp.experienceYears);
}

function handleDelete() {
  const rawCode = prompt("Nhập mã nhân viên cần xóa:");
  if (rawCode === null) {
    console.log("Đã hủy thao tác xóa, còn " + employees.length + " nhân viên");
    return;
  }
  const code = rawCode.trim().toUpperCase();
  const index = findEmployeeIndex(code);
  if (index === -1) {
    console.log("Không tìm thấy nhân viên có mã " + code);
    return;
  }
  const confirmAnswer = prompt("Bạn có chắc chắn muốn xóa nhân viên " + code + "? (Y/N)");
  if (confirmAnswer !== null && confirmAnswer.trim().toLowerCase() === "y") {
    employees.splice(index, 1);
    console.log("Xóa thành công, còn " + employees.length + " nhân viên");
  } else {
    console.log("Đã hủy thao tác xóa, còn " + employees.length + " nhân viên");
  }
}

function handleSearch() {
  const rawKeyword = prompt("Nhập từ khóa phòng ban cần tìm:");
  if (rawKeyword === null || rawKeyword.trim() === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }
  const keyword = rawKeyword.trim().toLowerCase();
  const results = [];
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].department.toLowerCase().includes(keyword)) {
      results.push(employees[i]);
    }
  }
  if (results.length === 0) {
    console.log("Không tìm thấy nhân viên phù hợp");
    return;
  }
  displayEmployees(results);
}

function printSummaryReport() {
  if (employees.length === 0) {
    console.log("Chưa có nhân viên nào");
    return;
  }
  let totalExperience = 0;
  let topEmployee = employees[0];
  for (let i = 0; i < employees.length; i++) {
    totalExperience += employees[i].experienceYears;
    if (employees[i].experienceYears > topEmployee.experienceYears) {
      topEmployee = employees[i];
    }
  }
  const average = (totalExperience / employees.length).toFixed(1);

  console.log(LINE);
  console.log("BÁO CÁO TỔNG KẾT NHÂN VIÊN");
  console.log(LINE);
  console.log("Tổng số nhân viên".padEnd(30) + ": " + employees.length);
  console.log("Số năm kinh nghiệm trung bình".padEnd(30) + ": " + average);
  console.log(
    "Kinh nghiệm nhiều nhất".padEnd(30) + ": " +
    topEmployee.employeeCode + " - " + topEmployee.fullName + " - " + topEmployee.experienceYears
  );
  console.log(LINE);
}

function main() {
  let running = true;
  while (running) {
    const choice = inputIntegerInRange(MENU_TEXT, 0, 5);

    if (choice === null) {
      console.log("Đã thoát chương trình.");
      printSummaryReport();
      break;
    }

    switch (choice) {
      case 1:
        handleDisplay();
        break;
      case 2:
        handleAdd();
        break;
      case 3:
        handleUpdate();
        break;
      case 4:
        handleDelete();
        break;
      case 5:
        handleSearch();
        break;
      case 0:
        printSummaryReport();
        console.log("Cảm ơn bạn đã sử dụng chương trình. Tạm biệt!");
        running = false;
        break;
      default:
        console.log("Lựa chọn không hợp lệ.");
        break;
    }
  }
}

main();