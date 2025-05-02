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
import styles from './TeamRenameModal.module.scss'

interface TeamRenameModalProps {
  children: React.ReactNode
}

export const TeamRenameModal = ({ children }: TeamRenameModalProps) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>
                <h4>Изменить название команды</h4>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">
                Название
              </Label>
              <Input 
                id="name"  
                className="col-span-3" 
                placeholder='Введите новое название команды'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Изменить название</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
};