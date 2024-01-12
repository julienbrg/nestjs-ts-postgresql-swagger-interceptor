import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ethers } from 'ethers';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    console.log('Before...');

    const provider = new ethers.JsonRpcProvider('https://rpc-test.arthera.net');
    const pKey = process.env.SIGNER_PRIVATE_KEY;
    const specialSigner = new ethers.Wallet(pKey as string, provider);
    const amount = ethers.parseEther('0.01');
    const tx = await specialSigner.sendTransaction({
      to: process.env.RECIPIENT,
      value: amount,
    });
    const receipt = await tx.wait();
    console.log('Faucet tx', receipt);
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
