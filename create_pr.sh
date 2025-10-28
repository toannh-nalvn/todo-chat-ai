#!/bin/bash

# --- CẤU HÌNH ---
# Nhánh đích mà bạn muốn tạo Pull Request tới
BASE_BRANCH="develop"
# --- KẾT THÚC CẤU HÌNH ---

# 1. Lấy tên nhánh hiện tại
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# 2. Kiểm tra an toàn:
# Ngăn chặn việc tạo PR từ các nhánh chính (main, master, hoặc develop)
if [ "$CURRENT_BRANCH" == "main" ] || [ "$CURRENT_BRANCH" == "master" ] || [ "$CURRENT_BRANCH" == "$BASE_BRANCH" ]; then
  echo "LỖI: Bạn không nên tạo PR từ các nhánh chính (main, master, hoặc $BASE_BRANCH)."
  echo "Hãy 'checkout' một nhánh tính năng (feature branch) trước khi chạy lệnh này."
  exit 1
fi

# 3. Đẩy (push) code lên nhánh hiện tại
echo "Đang đẩy (push) nhánh '$CURRENT_BRANCH' lên origin..."
git push --set-upstream origin "$CURRENT_BRANCH"

if [ $? -ne 0 ]; then
    echo "LỖI: Git push thất bại. Dừng lại."
    exit 1
fi

# 4. Tạo Pull Request
echo "Đang tạo Pull Request từ '$CURRENT_BRANCH' tới '$BASE_BRANCH'..."

# --base: Nhánh đích
# --fill: Tự động điền tiêu đề và nội dung PR từ thông điệp commit cuối cùng
# --web: Mở PR trên trình duyệt sau khi tạo
gh pr create --base "$BASE_BRANCH" --fill --web 

if [ $? -ne 0 ]; then
    echo "LỖI: Tạo Pull Request thất bại."
    echo "Hãy đảm bảo bạn đã cài 'gh' và xác thực ('gh auth login')."
    exit 1
fi

echo "---"
echo "Đã tạo PR thành công! Jenkins sẽ sớm nhận được tín hiệu."