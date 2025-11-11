lists = [1,2,3,4,5,6,7,8,9,10]
target = 9

for index , number in enumerate(lists):
    if number == target:
        print(f"找到目标值{target}，索引为{index}")
        break
else:
    print(f"未找到目标值{target}")