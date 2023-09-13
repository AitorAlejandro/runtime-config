import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Environment } from '../models/Environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentLoaderService {
  private envConfig: BehaviorSubject<Environment>;

  constructor(private readonly http: HttpClient) {
    this.envConfig = new BehaviorSubject<Environment>(environment);
  }

  public loadEnvConfig(configPath: string): void {
    this.http
      .get<Environment>(configPath)
      .subscribe((env: Environment) => this.envConfig.next(env));
  }

  public getEnvConfig(): Observable<Environment> {
    return this.envConfig.asObservable();
  }

  public getEnvConfigValue(): Environment {
    return this.envConfig.getValue();
  }
}
