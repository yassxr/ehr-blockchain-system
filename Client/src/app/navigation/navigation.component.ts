import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlockchainService } from 'src/services/blockchain.service';
import { Clipboard } from '@angular/cdk/clipboard';
import Web3 from 'web3';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  title = 'ehr-2.0';
  provider: any;
  web3js: any;
  netId: any;
  accounts: any;

  isConnected: boolean = false;

  load_text: string = 'Connecting to BlockChain....';

  progressWarn = false;
  progressSuccess = false;
  progressShow = true;

  retry_visibility: boolean = false;

  model: any = {};

  constructor(
    private blockChainService: BlockchainService,
    private http: HttpClient,
    private clipboard: Clipboard
  ) {
    this.accounts = 'Some Account ID';
  }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    alert('Account ID copied to clipboard');
  }

  ngOnInit(): void {
    this.load();
  }

  reload() {
    this.load();
  }

  load() {
    console.log('loading....');
    this.blockChainService.getWeb3Provider().then((result: Web3) => {
      console.log(result);
      this.accounts = result.eth.getAccounts((err, accs) => {
        if (accs[0] != null) {
          this.accounts = accs[0];
          this.isConnected = true;
          this.progressShow = false;
          this.progressWarn = false;
          this.progressSuccess = true;
        } else {
          this.accounts = null;
          setTimeout(() => {
            this.isConnected = false;
            this.progressWarn = true;
            this.load_text =
              'Unable to connect to BlockChain <br> ' +
              'Please Open Ganache and Connect to MetaMask';
            this.retry_visibility = true;
          }, 5000);
        }
        return accs;
      });
    });
  }

  closePopup() {
    this.progressShow = false;
    this.progressWarn = false;
    this.progressSuccess = false;
  }


}
