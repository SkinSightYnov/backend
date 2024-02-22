# pg_cleanup.sh
echo "Starting cleanup of PostgreSQL Kubernetes setup..."

echo "Deleting deployment..."
kubectl delete -f pg-deployment.yaml

echo "Deleting service..."
kubectl delete -f pg-service.yaml

echo "Deleting ConfigMap..."
kubectl delete -f pg-configmap.yaml

echo "Deleting namespace..."
kubectl delete namespace db

echo "Cleanup of PostgreSQL Kubernetes setup completed."
