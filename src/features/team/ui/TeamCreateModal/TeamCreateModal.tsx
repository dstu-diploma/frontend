import { Button } from "@/shared/ui/shadcn/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/shadcn/dialog"
import { Input } from "@/shared/ui/shadcn/input"
import { Label } from "@/shared/ui/shadcn/label"
import styles from './TeamCreateModal.module.scss'

interface TeamCreateModalProps {
  children: React.ReactNode
}

export const TeamCreateModal = ({ children }: TeamCreateModalProps) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>
              <h4>Создание команды</h4>
            </DialogTitle>
          </DialogHeader>
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <Label htmlFor="name">
                Название
              </Label>
              <Input 
                id="name"  
                className={styles.inputField}
                placeholder='Введите название команды'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Создать команду</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
};