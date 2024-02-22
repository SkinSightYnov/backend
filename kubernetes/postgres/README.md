# PostgreSQL Kubernetes setup :

## Deploy


Create the config map
```bash
kubectl apply -f pg-configmap.yaml
```

Create the Persistent Volume
```bash
kubectl apply -f pg-volume.yaml
```

Create the Persistent Volume Claim
```bash
kubectl apply -f pg-claim.yaml
```

Create the deployment
```bash
kubectl apply -f pg-deployment.yaml
```

Get the deployment name:
```bash
kubectl get deployments
```

Expose the deployment as a service
```bash
kubectl apply -f pg-service.yaml
```

## Access

The postgres is exposed on port 5432, you can get the port using the following command:
```bash
kubectl get svc
```

## Clean up

Delete the deployment
```bash
kubectl delete -f pg-deployment.yaml
```

Delete the service
```bash
kubectl delete -f pg-service.yaml
```

Delete the Persistent Volume Claim
```bash
kubectl delete -f pg-claim.yaml
```

Delete the Persistent Volume
```bash
kubectl delete -f pg-volume.yaml
```

Delete the config map
```bash
kubectl delete -f pg-configmap.yaml
```

Delete the namespace
```bash
kubectl delete namespace api
```

## Backup and Restore

Identify the pod name
```bash
kubectl get pods
```

Backup the database
```bash
kubectl exec -it <pod-name> -- pg_dump -U <username> -d <database-name> > db_backup.sql
```

Restore the database :
  first copy the backup file to the pod
```bash
kubectl cp backup.sql <pod-name>:/tmp/db_backup.sql
```

  then restore the database
```bash
kubectl exec -it <pod-name> -- psql -U <username> -d <database-name> -f /tmp/db_backup.sql
```

