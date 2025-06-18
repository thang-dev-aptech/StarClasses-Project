/* Cập nhật đồng loạt 8 bản ghi */
UPDATE courses
SET
    schedule = JSON_OBJECT(
        'schedule',
        JSON_OBJECT(
            'day',  'Thứ 2 – Thứ 6',
            'time', '18:00 – 20:00'
        )
    ),
    learning_outcomes = JSON_OBJECT(
        'outcomes',
        JSON_ARRAY(
            'Ôn tập toàn diện kiến thức trọng tâm',
            'Luyện giải đề theo cấu trúc đề thi',
            'Tăng cường kỹ năng giải nhanh và chính xác'
        )
    )
WHERE id BETWEEN 1 AND 8;