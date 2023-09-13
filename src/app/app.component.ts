import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnvironmentLoaderService } from './services/environment-loader.service';
import { Subject, takeUntil } from 'rxjs';
import { DEV_URL_CONFIG, PROD_URL_CONFIG } from './app.constants';
import { Environment } from './models/Environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  envConfig!: Environment;
  cancelSubscriptions = new Subject<void>();

  constructor(private readonly envService: EnvironmentLoaderService) {}

  ngOnInit(): void {
    this.envService
      .getEnvConfig()
      .pipe(takeUntil(this.cancelSubscriptions))
      .subscribe((env: Environment) => (this.envConfig = env));
  }

  ngOnDestroy(): void {
    this.cancelSubscriptions.next();
    this.cancelSubscriptions.complete();
  }

  public changeConfigDev(): void {
    this.envService.loadEnvConfig(DEV_URL_CONFIG);
  }

  public changeConfigProd(): void {
    this.envService.loadEnvConfig(PROD_URL_CONFIG);
  }
}
