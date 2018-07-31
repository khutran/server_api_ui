import { NFReactiveFormModule } from './nfreactive-form.module';

describe('NFReactiveFormModule', () => {
  let nFReactiveFormModule: NFReactiveFormModule;

  beforeEach(() => {
    nFReactiveFormModule = new NFReactiveFormModule();
  });

  it('should create an instance', () => {
    expect(nFReactiveFormModule).toBeTruthy();
  });
});
