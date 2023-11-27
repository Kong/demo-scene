## Configure kubectl

```bash
AWS_PROFILE=kong aws eks --region $(terraform output -raw region) update-kubeconfig --name $(terraform output -raw cluster_name)
```
