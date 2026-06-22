# Birthday Love Surprise

เว็บ Surprise วันเกิดแฟน + ขอเป็นแฟน สไตล์น่ารัก โรแมนติก เหมาะกับมือถือเป็นหลัก

## เริ่มใช้งาน

```bash
npm install
npm run dev
```

เปิด `http://localhost:3000`

## จุดที่แก้ไขบ่อย

- ข้อความและข้อมูลทั้งหมดอยู่ที่ `src/data/loveStory.ts`
- รูปตัวอย่างอยู่ที่ `public/images`
- เพลงพื้นหลังให้วางไฟล์ไว้ที่ `public/music/our-song.mp3` แล้วเปิด `music.src` ใน `src/data/loveStory.ts`

## Deploy

โปรเจกต์นี้เป็น Next.js static-friendly ไม่มี backend และ deploy บน Vercel ได้ทันที
