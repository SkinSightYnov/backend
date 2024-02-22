# promtail_deploy.sh
echo "Starting Promtail Kubernetes setup..."

echo "Creating Promtail config map..."
kubectl apply -f promtail-configmap.yaml

echo "Creating Promtail deployment..."
kubectl apply -f promtail-deployment.yaml

echo "Getting the deployment name..."
kubectl get deployments --namespace=monitoring

echo "Promtail Kubernetes setup completed."
