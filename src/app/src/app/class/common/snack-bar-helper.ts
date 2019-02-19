import { MatSnackBar } from '@angular/material';
import { NavigationService } from 'src/app/service/navigation.service';

export class SnackBarHelper {
	constructor(
			private snackBar: MatSnackBar,
			private navigationService: NavigationService) {
	}

	public back(message: string, navigationPath: string, navigationBackData: any): void {
    const snackBarRef = this.snackBar.open(message, 'Back', {duration: 3000});
    this.navigationService.back();
    snackBarRef.onAction().subscribe(() => 
      this.navigationService.navigate(navigationPath, navigationBackData)
    );
  }
}
