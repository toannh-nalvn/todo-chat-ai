#!/bin/bash

# --- CẤU HÌNH ---
# Nhánh đích mà bạn muốn tạo Pull Request tới
BASE_BRANCH="develop"
# --- KẾT THÚC CẤU HÌNH ---

# 1. Lấy tên nhánh hiện tại
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# 2. Kiểm tra an toàn
if [ "$CURRENT_BRANCH" == "main" ] || [ "$CURRENT_BRANCH" == "master" ] || [ "$CURRENT_BRANCH" == "$BASE_BRANCH" ]; then
  echo "LỖI: Bạn không nên chạy lệnh này từ các nhánh chính (main, master, hoặc $BASE_BRANCH)."
  echo "Hãy 'checkout' một nhánh tính năng (feature branch) trước."
  exit 1
fi

# 3. TỰ ĐỘNG ADD TẤT CẢ FILE (MỚI THÊM)
echo "Đang thực thi 'git add .'"
git add .

# 4. HỎI VÀ LẤY COMMIT MESSAGE (MỚI THÊM)
read -p "Nhập thông điệp commit của bạn: " COMMIT_MESSAGE

# Kiểm tra xem message có rỗng không
if [ -z "$COMMIT_MESSAGE" ]; then
    echo "LỖI: Thông điệp commit không được để trống."
    exit 1
fi

# 5. TỰ ĐỘNG COMMIT (MỚI THÊM)
echo "Đang thực thi 'git commit'..."
git commit -m "$COMMIT_MESSAGE"

if [ $? -ne 0 ]; then
    echo "LỖI: Git commit thất bại. (Có thể bạn chưa 'add' file nào?)"
    exit 1
fi

# 6. Đẩy (push) code lên nhánh hiện tại
echo "Đang đẩy (push) nhánh '$CURRENT_BRANCH' lên origin..."
git push --set-upstream origin "$CURRENT_BRANCH"

if [ $? -ne 0 ]; then
    echo "LỖI: Git push thất bại. Dừng lại."
    exit 1
fi

# 7. Tạo Pull Request
echo "Đang tạo Pull Request từ '$CURRENT_BRANCH' tới '$BASE_BRANCH'..."

# --fill: Sẽ tự động lấy thông điệp commit bạn vừa nhập ở trên
gh pr create --base "$BASE_BRANCH" --fill --web 

if [ $? -ne 0 ]; then
    echo "LỖI: Tạo Pull Request thất bại."
    exit 1
fi

echo "---"
echo "Hoàn tất! PR đã được tạo. Jenkins sẽ sớm gửi thông báo."