import { Component, OnInit } from '@angular/core';
import { ICrypto } from '../myclasses/iCrypto';
import { CryptoService } from '../myservices/crypto-service';

@Component({
  selector: 'app-ticker',
  standalone: false,
  templateUrl: './ticker.html',
  styleUrl: './ticker.css',
})
export class Ticker implements OnInit {

  cryptoList: ICrypto[] = [];

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.cryptoService.getCryptoData().subscribe({
      next: data => this.cryptoList = data,
      error: err => console.log(err)
    });
  }
}
