import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-lunarconverter',
  standalone: false,
  templateUrl: './lunarconverter.html',
  styleUrl: './lunarconverter.css',
})
export class Lunarconverter implements OnInit {
days: number[] = [];
  months: number[] = [];
  years: number[] = [];

  day!: number;
  month!: number;
  year!: number;

  weekday = '';
  lunarDate = '';
  lunarYear = '';
  lunarMonth = '';
  lunarDay = '';

  ngOnInit(): void {
    this.days = Array.from({ length: 31 }, (_, i) => i + 1);
    this.months = Array.from({ length: 12 }, (_, i) => i + 1);
    this.years = Array.from({ length: 100 }, (_, i) => 1950 + i);

    this.day = 15;
    this.month = 5;
    this.year = 1986;

    this.convert();
  }

  convert() {
    const weekdays = [
      'Chủ nhật',
      'Thứ 2',
      'Thứ 3',
      'Thứ 4',
      'Thứ 5',
      'Thứ 6',
      'Thứ 7',
    ];

    const can = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
    const chi = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

    const date = new Date(this.year, this.month - 1, this.day);
    this.weekday = `Ngày ${weekdays[date.getDay()]}`;

    // Demo âm lịch (giả lập theo hình)
    this.lunarDate = `7/4/${this.year}`;
    this.lunarYear = `${can[(this.year + 6) % 10]} ${chi[(this.year + 8) % 12]}`;
    this.lunarMonth = 'Quý Tỵ';
    this.lunarDay = 'Kỷ Mùi';
  }
}
